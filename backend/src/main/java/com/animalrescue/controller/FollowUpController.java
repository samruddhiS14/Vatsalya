package com.animalrescue.controller;

import com.animalrescue.model.FollowUp;
import com.animalrescue.repository.FollowUpRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/follow-ups")
@CrossOrigin(origins = "*")
public class FollowUpController {

    private final FollowUpRepository repository;

    public FollowUpController(FollowUpRepository repository) {
        this.repository = repository;
    }

    @GetMapping
    @Transactional
    public List<FollowUp> get(@RequestParam(required = false) String email) {
        List<FollowUp> list = new ArrayList<>(
                email == null || email.isBlank()
                        ? repository.findAllByOrderByScheduledDateAsc()
                        : repository.findByAdopterEmailIgnoreCaseOrderByScheduledDateAsc(email.trim())
        );

        LocalDate today = LocalDate.now();
        for (FollowUp followUp : list) {
            if (followUp.getStatus() == FollowUp.Status.PENDING
                    && followUp.getScheduledDate() != null
                    && followUp.getScheduledDate().isBefore(today)) {
                followUp.setStatus(FollowUp.Status.OVERDUE);
                repository.save(followUp);
            }
        }

        return list;
    }

    @PatchMapping("/{id}/complete")
    public ResponseEntity<?> complete(
            @PathVariable Long id,
            @RequestBody(required = false) Map<String, Object> body
    ) {
        var optional = repository.findById(id);
        if (optional.isEmpty()) return ResponseEntity.notFound().build();

        FollowUp followUp = optional.get();

        if (followUp.getStatus() == FollowUp.Status.COMPLETED) {
            return ResponseEntity.badRequest().body(Map.of("message", "Follow-up is already completed."));
        }

        followUp.setStatus(FollowUp.Status.COMPLETED);
        followUp.setCompletedAt(LocalDateTime.now());

        if (body != null && body.get("notes") != null) {
            followUp.setNotes(String.valueOf(body.get("notes")));
        }

        return ResponseEntity.ok(repository.save(followUp));
    }
}
