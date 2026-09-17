package com.animalrescue.model;

import jakarta.persistence.*;

@Entity
@Table(name = "shelters")
public class Shelter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String location;

    private int totalCapacity;
    private int currentOccupancy;
    private int availableSpace;

    @PrePersist
    @PreUpdate
    protected void calculateSpace() {
        this.availableSpace = Math.max(0, this.totalCapacity - this.currentOccupancy);
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public int getTotalCapacity() { return totalCapacity; }
    public void setTotalCapacity(int totalCapacity) { this.totalCapacity = totalCapacity; }
    public int getCurrentOccupancy() { return currentOccupancy; }
    public void setCurrentOccupancy(int currentOccupancy) { this.currentOccupancy = currentOccupancy; }
    public int getAvailableSpace() { return availableSpace; }
    public void setAvailableSpace(int availableSpace) { this.availableSpace = availableSpace; }
}
