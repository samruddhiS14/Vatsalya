package com.animalrescue.controller;

import com.animalrescue.model.AdoptionApplication;
import com.animalrescue.model.Animal;
import com.animalrescue.model.FollowUp;
import com.animalrescue.repository.AdoptionApplicationRepository;
import com.animalrescue.repository.AnimalRepository;
import com.animalrescue.repository.FollowUpRepository;
import com.animalrescue.repository.ShelterRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/adoptions")
@CrossOrigin(origins = "*")
public class AdoptionApplicationController {

    private final AdoptionApplicationRepository applications;
    private final AnimalRepository animals;
    private final FollowUpRepository followUps;
    private final ShelterRepository shelters;

    public AdoptionApplicationController(
            AdoptionApplicationRepository applications,
            AnimalRepository animals,
            FollowUpRepository followUps,
            ShelterRepository shelters
    ) {
        this.applications = applications;
        this.animals = animals;
        this.followUps = followUps;
        this.shelters = shelters;
    }

    @GetMapping
    public List<AdoptionApplication> get(@RequestParam(required = false) String email) {
        return email == null || email.isBlank()
                ? applications.findAllByOrderByAppliedAtDesc()
                : applications.findByAdopterEmailIgnoreCaseOrderByAppliedAtDesc(email.trim());
    }

    @PostMapping
    public ResponseEntity<?> apply(@RequestBody AdoptionApplication input) {
        if (input.getAnimalId() == null || input.getAdopterEmail() == null || input.getAdopterEmail().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Animal and adopter email are required."));
        }

        Optional<Animal> optionalAnimal = animals.findById(input.getAnimalId());
        if (optionalAnimal.isEmpty()) return ResponseEntity.notFound().build();

        Animal animal = optionalAnimal.get();
        if (animal.getStatus() != Animal.AnimalStatus.ADOPTION_READY) {
            return ResponseEntity.badRequest().body(Map.of("message", "This animal is not currently adoption-ready."));
        }

        String email = input.getAdopterEmail().trim().toLowerCase(Locale.ROOT);
        if (applications.existsByAnimalIdAndAdopterEmailIgnoreCase(animal.getId(), email)) {
            return ResponseEntity.badRequest().body(Map.of("message", "You already applied for this animal."));
        }

        AdoptionApplication app = new AdoptionApplication();
        app.setAnimalId(animal.getId());
        app.setAdopterEmail(email);
        app.setNotes(input.getNotes());
        app.setStatus(AdoptionApplication.Status.PENDING);

        return ResponseEntity.ok(applications.save(app));
    }

    @PatchMapping("/{id}/status")
    @Transactional
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam AdoptionApplication.Status status
    ) {
        Optional<AdoptionApplication> optional = applications.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        AdoptionApplication app = optional.get();
        Optional<Animal> optionalAnimal = animals.findById(app.getAnimalId());
        if (optionalAnimal.isEmpty()) return ResponseEntity.notFound().build();

        Animal animal = optionalAnimal.get();

        if (status == AdoptionApplication.Status.APPROVED) {
            if (app.getStatus() != AdoptionApplication.Status.PENDING) {
                return ResponseEntity.badRequest().body(Map.of("message", "Only pending applications can be approved."));
            }
            if (animal.getStatus() != Animal.AnimalStatus.ADOPTION_READY) {
                return ResponseEntity.badRequest().body(Map.of("message", "Animal is no longer available for adoption."));
            }
            if (applications.existsByAnimalIdAndStatus(animal.getId(), AdoptionApplication.Status.APPROVED)) {
                return ResponseEntity.badRequest().body(Map.of("message", "Another application is already approved for this animal."));
            }
        }

        if (status == AdoptionApplication.Status.REJECTED
                && app.getStatus() != AdoptionApplication.Status.PENDING) {
            return ResponseEntity.badRequest().body(Map.of("message", "Only pending applications can be rejected."));
        }

        if (status == AdoptionApplication.Status.COMPLETED) {
            if (app.getStatus() != AdoptionApplication.Status.APPROVED) {
                return ResponseEntity.badRequest().body(Map.of("message", "Only an approved application can be completed."));
            }
            if (animal.getStatus() != Animal.AnimalStatus.ADOPTION_READY) {
                return ResponseEntity.badRequest().body(Map.of("message", "This animal has already been adopted or moved out of the adoption pipeline."));
            }

            Long shelterId = animal.getShelterId();
            if (shelterId != null) {
                shelters.findById(shelterId).ifPresent(s -> {
                    s.setCurrentOccupancy(Math.max(0, s.getCurrentOccupancy() - 1));
                    shelters.save(s);
                });
            }

            animal.setShelterId(null);
            animal.setStatus(Animal.AnimalStatus.ADOPTED);
            animals.save(animal);

            if (!followUps.existsByAdoptionApplicationId(app.getId())) {
                FollowUp followUp = new FollowUp();
                followUp.setAdoptionApplicationId(app.getId());
                followUp.setAnimalId(animal.getId());
                followUp.setAdopterEmail(app.getAdopterEmail());
                followUp.setScheduledDate(LocalDate.now().plusDays(30));
                followUp.setStatus(FollowUp.Status.PENDING);
                followUps.save(followUp);
            }

            for (AdoptionApplication other : applications.findAllByOrderByAppliedAtDesc()) {
                if (other.getAnimalId().equals(animal.getId())
                        && !other.getId().equals(app.getId())
                        && (other.getStatus() == AdoptionApplication.Status.PENDING
                        || other.getStatus() == AdoptionApplication.Status.APPROVED)) {
                    other.setStatus(AdoptionApplication.Status.REJECTED);
                    other.setReviewedAt(LocalDateTime.now());
                    applications.save(other);
                }
            }
        }

        app.setStatus(status);
        app.setReviewedAt(LocalDateTime.now());
        return ResponseEntity.ok(applications.save(app));
    }
}
