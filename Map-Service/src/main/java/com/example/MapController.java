package com.example;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapService mapService;

    @GetMapping // Now maps to GET /map
    public ResponseEntity<Map> getRandomMap() {
        Map randomMap = mapService.getRandomMap();
        if (randomMap == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(randomMap);
    }
}