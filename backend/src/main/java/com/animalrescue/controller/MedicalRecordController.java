package com.animalrescue.controller;

import com.animalrescue.model.Animal;
import com.animalrescue.model.MedicalRecord;
import com.animalrescue.repository.AnimalRepository;
import com.animalrescue.repository.MedicalRecordRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/medical")
@CrossOrigin(origins = "*")
public class MedicalRecordController {
    private final MedicalRecordRepository medicalRepository;
    private final AnimalRepository animalRepository;
    public MedicalRecordController(MedicalRecordRepository medicalRepository, AnimalRepository animalRepository) { this.medicalRepository = medicalRepository; this.animalRepository = animalRepository; }
    @GetMapping public List<MedicalRecord> getAllRecords() { return medicalRepository.findAll(); }
    @GetMapping("/animal/{animalId}") public List<MedicalRecord> getByAnimal(@PathVariable Long animalId) { return medicalRepository.findByAnimalIdOrderByVisitDateDesc(animalId); }
    @PostMapping public ResponseEntity<?> createRecord(@RequestBody Map<String,Object> body) {
        Long animalId = body.get("animalId") == null ? null : Long.valueOf(body.get("animalId").toString());
        if (animalId == null) return ResponseEntity.badRequest().body(Map.of("message","animalId is required."));
        Animal animal = animalRepository.findById(animalId).orElse(null);
        if (animal == null) return ResponseEntity.notFound().build();
        MedicalRecord record = new MedicalRecord(); record.setAnimal(animal);
        record.setDiagnosis((String)body.get("diagnosis")); record.setTreatmentNotes((String)body.get("treatmentNotes")); record.setVaccinationDetails((String)body.get("vaccinationDetails"));
        record.setVaccinated(Boolean.parseBoolean(String.valueOf(body.getOrDefault("vaccinated", false))));
        record.setSterilized(Boolean.parseBoolean(String.valueOf(body.getOrDefault("sterilized", false))));
        String hs=String.valueOf(body.getOrDefault("healthStatus","STABLE")); record.setHealthStatus(MedicalRecord.HealthStatus.valueOf(hs));
        animal.setStatus(record.getHealthStatus()==MedicalRecord.HealthStatus.READY_FOR_ADOPTION ? Animal.AnimalStatus.ADOPTION_READY : Animal.AnimalStatus.UNDER_TREATMENT);
        animalRepository.save(animal);
        return ResponseEntity.ok(medicalRepository.save(record));
    }
    @PatchMapping("/animal/{animalId}/ready") public ResponseEntity<?> markReady(@PathVariable Long animalId) {
        return animalRepository.findById(animalId).map(animal -> { animal.setStatus(Animal.AnimalStatus.ADOPTION_READY); animalRepository.save(animal); return ResponseEntity.ok(Map.of("message","Animal marked adoption-ready.")); }).orElse(ResponseEntity.notFound().build());
    }
}
