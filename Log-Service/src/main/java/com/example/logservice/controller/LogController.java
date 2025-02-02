package com.example.logservice.controller;

import com.example.logservice.model.Log;
import com.example.logservice.service.LogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/logs")
public class LogController {

    @Autowired
    private LogService logService;

    @GetMapping
    public List<Log> getAllLogs() {
        return logService.getAllLogs();
    }
}
