package com.example.logservice.controller;

import com.example.logservice.model.Log;
import com.example.logservice.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogController {

    @Autowired
    private LogService logService;

    // Get all logs sorted by timestamp
    @GetMapping
    public List<Log> getAllLogs() {
        return logService.getAllLogs();
    }

    // Get logs for a specific hero sorted by timestamp
    @GetMapping("/hero/{heroID}")
    public ResponseEntity<List<Log>> getLogsByHero(@PathVariable Integer heroID) {
        List<Log> logs = logService.getLogsByHero(heroID);

        if (logs.isEmpty()) {
            return ResponseEntity.notFound().build(); // Return 404 if no logs are found
        }

        return ResponseEntity.ok(logs);
    }
}
