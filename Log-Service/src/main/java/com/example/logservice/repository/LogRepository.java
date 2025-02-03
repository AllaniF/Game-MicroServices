package com.example.logservice.repository;

import com.example.logservice.model.Log;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LogRepository extends JpaRepository<Log, Integer> {

    List<Log> findAllByOrderByTimestampAsc(); // Get all logs ordered by timestamp

    List<Log> findByHeroIDOrderByTimestampAsc(Integer heroID); // Get logs by hero, ordered by time
}
