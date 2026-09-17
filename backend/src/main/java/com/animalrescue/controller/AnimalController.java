package com.animalrescue.controller;

import com.animalrescue.model.Animal;
import com.animalrescue.repository.AnimalRepository;
import com.animalrescue.repository.ShelterRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/animals")
@CrossOrigin(origins = "*")
public class AnimalController {

    private final AnimalRepository animalRepository;
    private final ShelterRepository shelterRepository;

    public AnimalController(AnimalRepository animalRepository, ShelterRepository shelterRepository) {
        this.animalRepository = animalRepository;
        this.shelterRepository = shelterRepository;
    }

    @GetMapping
    public List<Animal> getAllAnimals() {
        return animalRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Animal> getAnimalById(@PathVariable Long id) {
        return animalRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> createAnimal(@RequestBody Animal animal) {
        if (animal.getMicrochipId() == null || animal.getMicrochipId().isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Microchip ID is required."));
        }

        String chip = animal.getMicrochipId().trim();
        if (animalRepository.findByMicrochipId(chip).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Microchip ID already exists."));
        }

        animal.setId(null);
        animal.setMicrochipId(chip);
        if (animal.getStatus() == null) {
            animal.setStatus(Animal.AnimalStatus.RESCUED);
        }

        return ResponseEntity.ok(animalRepository.save(animal));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestParam Animal.AnimalStatus status
    ) {
        var optional = animalRepository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        Animal animal = optional.get();
        animal.setStatus(status);
        return ResponseEntity.ok(animalRepository.save(animal));
    }

    @PatchMapping("/{id}/shelter")
    public ResponseEntity<?> assignShelter(
            @PathVariable Long id,
            @RequestParam Long shelterId
    ) {
        var optionalAnimal = animalRepository.findById(id);
        if (optionalAnimal.isEmpty()) return ResponseEntity.notFound().build();

        var optionalShelter = shelterRepository.findById(shelterId);
        if (optionalShelter.isEmpty()) return ResponseEntity.notFound().build();

        Animal animal = optionalAnimal.get();
        var shelter = optionalShelter.get();

        if (animal.getShelterId() != null && animal.getShelterId().equals(shelterId)) {
            return ResponseEntity.ok(animal);
        }

        if (shelter.getCurrentOccupancy() >= shelter.getTotalCapacity()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Shelter is at full capacity."));
        }

        if (animal.getShelterId() != null) {
            shelterRepository.findById(animal.getShelterId()).ifPresent(old -> {
                old.setCurrentOccupancy(Math.max(0, old.getCurrentOccupancy() - 1));
                shelterRepository.save(old);
            });
        }

        shelter.setCurrentOccupancy(shelter.getCurrentOccupancy() + 1);
        shelterRepository.save(shelter);

        animal.setShelterId(shelterId);
        if (animal.getStatus() != Animal.AnimalStatus.ADOPTED
                && animal.getStatus() != Animal.AnimalStatus.ADOPTION_READY) {
            animal.setStatus(Animal.AnimalStatus.SHELTERED);
        }

        return ResponseEntity.ok(animalRepository.save(animal));
    }
}
