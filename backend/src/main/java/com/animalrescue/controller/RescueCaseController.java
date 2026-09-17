package com.animalrescue.controller;

import com.animalrescue.model.Animal;
import com.animalrescue.model.RescueCase;
import com.animalrescue.repository.AnimalRepository;
import com.animalrescue.repository.RescueCaseRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rescues")
@CrossOrigin(origins = "*")
public class RescueCaseController {

    private final RescueCaseRepository rescueCaseRepository;
    private final AnimalRepository animalRepository;

    public RescueCaseController(
            RescueCaseRepository rescueCaseRepository,
            AnimalRepository animalRepository
    ) {
        this.rescueCaseRepository = rescueCaseRepository;
        this.animalRepository = animalRepository;
    }

    @GetMapping
    public List<RescueCase> getAllCases() {
        return rescueCaseRepository.findAll();
    }

    @GetMapping("/reporter")
    public List<RescueCase> getCasesByReporter(@RequestParam String email) {
        return rescueCaseRepository.findByReporterEmailIgnoreCaseOrderByReportedAtDesc(email.trim());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RescueCase> getCaseById(@PathVariable Long id) {
        return rescueCaseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createCase(@RequestBody RescueCase rescueCase) {
        if (rescueCase.getDescription() == null || rescueCase.getDescription().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "A rescue description is required."));
        }

        rescueCase.setId(null);
        rescueCase.setStatus(RescueCase.Status.PENDING_TRIAGE);
        if (rescueCase.getUrgency() == null) {
            rescueCase.setUrgency(RescueCase.Urgency.MODERATE);
        }
        rescueCase.setAnimalId(null);

        RescueCase savedCase = rescueCaseRepository.save(rescueCase);
        return ResponseEntity.ok(savedCase);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam RescueCase.Status status
    ) {
        return rescueCaseRepository.findById(id)
                .map(rescueCase -> {
                    RescueCase.Status current = rescueCase.getStatus();

                    boolean valid =
                            (current == RescueCase.Status.PENDING_TRIAGE && status == RescueCase.Status.DISPATCHED)
                            || (current == RescueCase.Status.DISPATCHED && status == RescueCase.Status.RESCUED)
                            || (current == RescueCase.Status.RESCUED && status == RescueCase.Status.CLOSED);

                    if (current == status) {
                        return ResponseEntity.badRequest().body(Map.of("message", "Case is already in this status."));
                    }

                    if (status == RescueCase.Status.CLOSED && rescueCase.getAnimalId() == null) {
                        return ResponseEntity.badRequest().body(Map.of(
                                "message",
                                "Create and link the animal record before closing the rescue case."
                        ));
                    }

                    if (!valid) {
                        return ResponseEntity.badRequest().body(Map.of(
                                "message",
                                "Invalid rescue transition: " + current + " → " + status
                        ));
                    }

                    rescueCase.setStatus(status);
                    return ResponseEntity.ok(rescueCaseRepository.save(rescueCase));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping("/{id}/animal")
    public ResponseEntity<?> createAnimalFromRescue(
            @PathVariable Long id,
            @RequestBody Animal input
    ) {
        var optionalCase = rescueCaseRepository.findById(id);
        if (optionalCase.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        RescueCase rescueCase = optionalCase.get();

        if (rescueCase.getStatus() != RescueCase.Status.RESCUED) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message",
                    "The rescue case must be marked RESCUED before creating the animal record."
            ));
        }

        if (rescueCase.getAnimalId() != null) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message",
                    "This rescue case is already linked to an animal record."
            ));
        }

        if (input.getMicrochipId() == null || input.getMicrochipId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Microchip ID is required."));
        }

        String microchip = input.getMicrochipId().trim();
        if (animalRepository.findByMicrochipId(microchip).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Microchip ID already exists."));
        }

        input.setId(null);
        input.setMicrochipId(microchip);
        input.setShelterId(null);
        input.setStatus(Animal.AnimalStatus.RESCUED);

        if (input.getRescueLocation() == null || input.getRescueLocation().isBlank()) {
            input.setRescueLocation(rescueCase.getLocationLabel());
        }

        if ((input.getImageUrl() == null || input.getImageUrl().isBlank())
                && rescueCase.getPhotoData() != null
                && !rescueCase.getPhotoData().isBlank()) {
            input.setImageUrl(rescueCase.getPhotoData());
        }

        Animal savedAnimal = animalRepository.save(input);
        rescueCase.setAnimalId(savedAnimal.getId());
        rescueCaseRepository.save(rescueCase);

        return ResponseEntity.ok(savedAnimal);
    }
}
