package com.animalrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "adoption_applications")
public class AdoptionApplication {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long animalId;
    @Column(nullable = false) private String adopterEmail;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Status status = Status.PENDING;
    private String notes;
    private LocalDateTime appliedAt;
    private LocalDateTime reviewedAt;

    @PrePersist protected void onCreate() { if (appliedAt == null) appliedAt = LocalDateTime.now(); }
    public enum Status { PENDING, APPROVED, REJECTED, COMPLETED }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getAnimalId() { return animalId; }
    public void setAnimalId(Long animalId) { this.animalId = animalId; }
    public String getAdopterEmail() { return adopterEmail; }
    public void setAdopterEmail(String adopterEmail) { this.adopterEmail = adopterEmail; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getAppliedAt() { return appliedAt; }
    public void setAppliedAt(LocalDateTime appliedAt) { this.appliedAt = appliedAt; }
    public LocalDateTime getReviewedAt() { return reviewedAt; }
    public void setReviewedAt(LocalDateTime reviewedAt) { this.reviewedAt = reviewedAt; }
}
