package com.animalrescue.repository;

import com.animalrescue.model.RescueCase;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RescueCaseRepository extends JpaRepository<RescueCase, Long> {

    List<RescueCase> findByReporterEmailIgnoreCaseOrderByReportedAtDesc(
            String reporterEmail
    );
}
