package com.example.controller;

import com.example.service.MapService;
import com.example.model.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/map")
public class MapController {

    @Autowired
    private MapService mapService;

    @GetMapping // Now maps to GET /map?heroID=123
    public ResponseEntity<Map> getMap(@RequestParam Integer heroID) {
        Map randomMap = mapService.getRandomMap();
        if (randomMap == null) {
            return ResponseEntity.notFound().build();
        }
        mapService.sendLogsToQueue("Random map sent from MapService to frontend", heroID);
        return ResponseEntity.ok(randomMap);
    }
}