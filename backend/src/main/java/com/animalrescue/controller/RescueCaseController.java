package com.animalrescue.controller;

import com.animalrescue.model.RescueCase;
import com.animalrescue.repository.RescueCaseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rescues")
@CrossOrigin(origins = "*")
public class RescueCaseController {

    @Autowired
    private RescueCaseRepository rescueCaseRepository;

    @GetMapping
    public List<RescueCase> getAllCases() {
        return rescueCaseRepository.findAll();
    }

    @GetMapping("/reporter")
    public List<RescueCase> getCasesByReporter(@RequestParam String email) {
        return rescueCaseRepository.findByReporterEmailIgnoreCaseOrderByReportedAtDesc(email);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RescueCase> getCaseById(@PathVariable Long id) {
        return rescueCaseRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<RescueCase> createCase(@RequestBody RescueCase rescueCase) {
        if (rescueCase.getStatus() == null) {
            rescueCase.setStatus(RescueCase.Status.PENDING_TRIAGE);
        }

        if (rescueCase.getUrgency() == null) {
            rescueCase.setUrgency(RescueCase.Urgency.MODERATE);
        }

        RescueCase savedCase = rescueCaseRepository.save(rescueCase);

        return ResponseEntity.ok(savedCase);
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<RescueCase> updateStatus(
            @PathVariable Long id,
            @RequestParam RescueCase.Status status
    ) {
        return rescueCaseRepository.findById(id)
                .map(rescueCase -> {
                    rescueCase.setStatus(status);
                    return ResponseEntity.ok(
                            rescueCaseRepository.save(rescueCase)
                    );
                })
                .orElse(ResponseEntity.notFound().build());
    }
}