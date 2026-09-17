package com.animalrescue.repository;

import com.animalrescue.model.FollowUp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FollowUpRepository extends JpaRepository<FollowUp, Long> {
    List<FollowUp> findByAdopterEmailIgnoreCaseOrderByScheduledDateAsc(String adopterEmail);
    List<FollowUp> findAllByOrderByScheduledDateAsc();
    Optional<FollowUp> findByAdoptionApplicationId(Long adoptionApplicationId);
    boolean existsByAdoptionApplicationId(Long adoptionApplicationId);
}
