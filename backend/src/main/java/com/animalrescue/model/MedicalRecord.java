package com.animalrescue.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "medical_records")
public class MedicalRecord {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne @JoinColumn(name = "animal_id", nullable = false)
    private Animal animal;
    private String diagnosis;
    @Column(columnDefinition = "TEXT") private String treatmentNotes;
    @Column(columnDefinition = "TEXT") private String vaccinationDetails;
    private boolean vaccinated;
    private boolean sterilized;
    @Enumerated(EnumType.STRING) private HealthStatus healthStatus = HealthStatus.STABLE;
    private LocalDate visitDate;

    @PrePersist @PreUpdate
    protected void onUpdate() { if (visitDate == null) visitDate = LocalDate.now(); }

    public enum HealthStatus { STABLE, CRITICAL, RECOVERING, HEALTHY, READY_FOR_ADOPTION }
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public Animal getAnimal() { return animal; }
    public void setAnimal(Animal animal) { this.animal = animal; }
    public String getDiagnosis() { return diagnosis; }
    public void setDiagnosis(String diagnosis) { this.diagnosis = diagnosis; }
    public String getTreatmentNotes() { return treatmentNotes; }
    public void setTreatmentNotes(String treatmentNotes) { this.treatmentNotes = treatmentNotes; }
    public String getVaccinationDetails() { return vaccinationDetails; }
    public void setVaccinationDetails(String vaccinationDetails) { this.vaccinationDetails = vaccinationDetails; }
    public boolean isVaccinated() { return vaccinated; }
    public void setVaccinated(boolean vaccinated) { this.vaccinated = vaccinated; }
    public boolean isSterilized() { return sterilized; }
    public void setSterilized(boolean sterilized) { this.sterilized = sterilized; }
    public HealthStatus getHealthStatus() { return healthStatus; }
    public void setHealthStatus(HealthStatus healthStatus) { this.healthStatus = healthStatus; }
    public LocalDate getVisitDate() { return visitDate; }
    public void setVisitDate(LocalDate visitDate) { this.visitDate = visitDate; }
}
