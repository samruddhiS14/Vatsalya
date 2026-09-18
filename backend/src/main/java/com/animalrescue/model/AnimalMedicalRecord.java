package com.animalrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "animal_medical_records")
public class AnimalMedicalRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String animalName;

    @Column(nullable = false)
    private String species;

    private String diagnosis;
    private String treatmentNotes;
    private boolean vaccinated;
    private boolean sterilized;

    @Enumerated(EnumType.STRING)
    private HealthStatus healthStatus = HealthStatus.STABLE;

    private LocalDateTime updatedAt;

    public enum HealthStatus {
        STABLE, CRITICAL, RECOVERING, HEALTHY, READY_FOR_ADOPTION
    }

    @PrePersist
    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = LocalDateTime.now();
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getAnimalName() { return animalName; }
    public void setAnimalName(String animalName) { this.animalName = animalName; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public String getTreatmentNotes() { return treatmentNotes; }
    public void setTreatmentNotes(String treatmentNotes) { this.treatmentNotes = treatmentNotes; }
    public boolean isVaccinated() { return vaccinated; }
    public void setVaccinated(boolean vaccinated) { this.vaccinated = vaccinated; }
    public boolean isSterilized() { return sterilized; }
    public void setSterilized(boolean sterilized) { this.sterilized = sterilized; }
    public HealthStatus getHealthStatus() { return healthStatus; }
    public void setHealthStatus(HealthStatus healthStatus) { this.healthStatus = healthStatus; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
}
