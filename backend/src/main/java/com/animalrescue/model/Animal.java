package com.animalrescue.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "animals")
public class Animal {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String microchipId;

    private String name;
    private String species;
    private String breed;
    private Integer ageEstimate;
    private String sex;
    private String color;
    private String imageUrl;
    private String rescueLocation;
    private Long shelterId;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private AnimalStatus status = AnimalStatus.RESCUED;

    private LocalDateTime createdAt;

    public enum AnimalStatus {
        RESCUED, UNDER_TREATMENT, SHELTERED, ADOPTION_READY, ADOPTED
    }

    @PrePersist
    protected void onCreate() {
        if (createdAt == null) createdAt = LocalDateTime.now();
        if (status == null) status = AnimalStatus.RESCUED;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getMicrochipId() { return microchipId; }
    public void setMicrochipId(String microchipId) { this.microchipId = microchipId; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSpecies() { return species; }
    public void setSpecies(String species) { this.species = species; }
    public String getBreed() { return breed; }
    public void setBreed(String breed) { this.breed = breed; }
    public Integer getAgeEstimate() { return ageEstimate; }
    public void setAgeEstimate(Integer ageEstimate) { this.ageEstimate = ageEstimate; }
    public String getSex() { return sex; }
    public void setSex(String sex) { this.sex = sex; }
    public String getColor() { return color; }
    public void setColor(String color) { this.color = color; }
    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    public String getRescueLocation() { return rescueLocation; }
    public void setRescueLocation(String rescueLocation) { this.rescueLocation = rescueLocation; }
    public Long getShelterId() { return shelterId; }
    public void setShelterId(Long shelterId) { this.shelterId = shelterId; }
    public AnimalStatus getStatus() { return status; }
    public void setStatus(AnimalStatus status) { this.status = status; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}
