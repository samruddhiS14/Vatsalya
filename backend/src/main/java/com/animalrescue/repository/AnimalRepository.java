package com.animalrescue.repository;

import com.animalrescue.model.Animal;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface AnimalRepository extends JpaRepository<Animal, Long> {
    Optional<Animal> findByMicrochipId(String microchipId);
}
