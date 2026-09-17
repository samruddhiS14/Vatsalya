package com.animalrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "rescue_cases")
public class RescueCase {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, columnDefinition = "TEXT") private String description;
    private String imageUrl;
    @Lob @Column(columnDefinition = "TEXT") private String photoData;
    private double latitude;
    private double longitude;
    private String locationLabel;
    private String reporterEmail;
    private Long animalId;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Urgency urgency = Urgency.MODERATE;
    @Enumerated(EnumType.STRING) @Column(nullable = false)
    private Status status = Status.PENDING_TRIAGE;
    private LocalDateTime reportedAt;

    @PrePersist
    protected void onCreate() {
        if (reportedAt == null) reportedAt = LocalDateTime.now();
        if (status == null) status = Status.PENDING_TRIAGE;
        if (urgency == null) urgency = Urgency.MODERATE;
    }

    public enum Urgency { CRITICAL, URGENT, MODERATE, LOW }
    public enum Status { PENDING_TRIAGE, DISPATCHED, RESCUED, CLOSED }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getPhotoData() { return photoData; }
    public void setPhotoData(String photoData) { this.photoData = photoData; }
    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }
    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }
    public String getLocationLabel() { return locationLabel; }
    public void setLocationLabel(String locationLabel) { this.locationLabel = locationLabel; }
    public String getReporterEmail() { return reporterEmail; }
    public void setReporterEmail(String reporterEmail) { this.reporterEmail = reporterEmail; }
    public Long getAnimalId() { return animalId; }
    public void setAnimalId(Long animalId) { this.animalId = animalId; }
    public Urgency getUrgency() { return urgency; }
    public void setUrgency(Urgency urgency) { this.urgency = urgency; }
    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
    public LocalDateTime getReportedAt() { return reportedAt; }
    public void setReportedAt(LocalDateTime reportedAt) { this.reportedAt = reportedAt; }
}
