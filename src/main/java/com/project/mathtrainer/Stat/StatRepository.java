package com.project.mathtrainer.Stat;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StatRepository extends JpaRepository<Stat, Long> {
    Optional<Stat> findByUserId(Long userId);

    List<Stat> findAllByUserId(Long userId);
}
