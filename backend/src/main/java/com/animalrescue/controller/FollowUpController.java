package com.animalrescue.controller;

import com.animalrescue.model.FollowUp;
import com.animalrescue.repository.FollowUpRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/follow-ups")
@CrossOrigin(origins = "*")
public class FollowUpController {
    private final FollowUpRepository repository;
    public FollowUpController(FollowUpRepository repository) { this.repository = repository; }
    @GetMapping public List<FollowUp> get(@RequestParam(required=false) String email) {
        List<FollowUp> list = email==null||email.isBlank() ? repository.findAllByOrderByScheduledDateAsc() : repository.findByAdopterEmailIgnoreCaseOrderByScheduledDateAsc(email.trim());
        java.time.LocalDate today = java.time.LocalDate.now();
        list.forEach(f -> { if (f.getStatus() == FollowUp.Status.PENDING && f.getScheduledDate() != null && f.getScheduledDate().isBefore(today)) f.setStatus(FollowUp.Status.OVERDUE); });
        return list;
    }
    @PatchMapping("/{id}/complete") public ResponseEntity<?> complete(@PathVariable Long id,@RequestBody(required=false) Map<String,Object> body) {
        var optional=repository.findById(id); if(optional.isEmpty()) return ResponseEntity.notFound().build(); FollowUp f=optional.get();
        if(f.getStatus()==FollowUp.Status.COMPLETED) return ResponseEntity.badRequest().body(Map.of("message","Follow-up is already completed."));
        f.setStatus(FollowUp.Status.COMPLETED); f.setCompletedAt(LocalDateTime.now()); if(body!=null&&body.get("notes")!=null) f.setNotes(String.valueOf(body.get("notes")));
        return ResponseEntity.ok(repository.save(f));
    }
}
