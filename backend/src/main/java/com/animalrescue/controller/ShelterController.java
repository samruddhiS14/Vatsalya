package com.animalrescue.controller;

import com.animalrescue.model.Shelter;
import com.animalrescue.repository.ShelterRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/shelters")
@CrossOrigin(origins = "*")
public class ShelterController {

    @Autowired
    private ShelterRepository shelterRepository;

    @GetMapping
    public List<Shelter> getAllShelters() {
        return shelterRepository.findAll();
    }

    @PostMapping
    public ResponseEntity<Shelter> createShelter(@RequestBody Shelter shelter) {
        Shelter saved = shelterRepository.save(shelter);
        return ResponseEntity.ok(saved);
    }
}
