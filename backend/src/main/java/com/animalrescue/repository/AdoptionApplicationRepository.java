package com.animalrescue.repository;

import com.animalrescue.model.AdoptionApplication;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdoptionApplicationRepository extends JpaRepository<AdoptionApplication, Long> {
    List<AdoptionApplication> findByAdopterEmailIgnoreCaseOrderByAppliedAtDesc(String adopterEmail);
    List<AdoptionApplication> findAllByOrderByAppliedAtDesc();
    boolean existsByAnimalIdAndAdopterEmailIgnoreCase(Long animalId, String adopterEmail);
    boolean existsByAnimalIdAndStatus(Long animalId, AdoptionApplication.Status status);
}
