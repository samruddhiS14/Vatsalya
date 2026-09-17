package com.animalrescue.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "follow_ups")
public class FollowUp {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false) private Long adoptionApplicationId;
    @Column(nullable = false) private Long animalId;
    @Column(nullable = false) private String adopterEmail;
    private LocalDate scheduledDate;
    @Enumerated(EnumType.STRING) private Status status = Status.PENDING;
    @Column(columnDefinition = "TEXT") private String notes;
    private LocalDateTime completedAt;

    public enum Status { PENDING, COMPLETED, OVERDUE }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Long getAdoptionApplicationId() { return adoptionApplicationId; }
    public void setAdoptionApplicationId(Long adoptionApplicationId) { this.adoptionApplicationId = adoptionApplicationId; }
    public Long getAnimalId() { return animalId; }
    public void setAnimalId(Long animalId) { this.animalId = animalId; }
    public String getAdopterEmail() { return adopterEmail; }
    public void setAdopterEmail(String adopterEmail) { this.adopterEmail = adopterEmail; }
    public LocalDate getScheduledDate() { return scheduledDate; }
    public void setScheduledDate(LocalDate scheduledDate) { this.scheduledDate = scheduledDate; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCompletedAt() { return completedAt; }
    public void setCompletedAt(LocalDateTime completedAt) { this.completedAt = completedAt; }
}
