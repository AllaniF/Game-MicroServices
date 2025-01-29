package com.example;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EntityRepository extends JpaRepository<Entity, Integer> {
    List<Entity> findByType(String type);
}