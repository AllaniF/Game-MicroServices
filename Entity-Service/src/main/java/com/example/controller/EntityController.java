package com.example.controller;

import com.example.model.Entity;
import com.example.service.EntityService;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/entity")
public class EntityController {

    private final EntityService entityService;

    public EntityController(EntityService entityService) {
        this.entityService = entityService;
    }

    @GetMapping("/heroes")
    public List<Entity> getAllHeroes() {
        entityService.sendLogsToQueue("The list of all heroes is sent to frontend", 0);
        return entityService.getAllHeroes();
    }

    @PostMapping("/heroes")
    public ResponseEntity<Entity> createHero(@RequestBody Entity entity) {
        Entity createdHero = entityService.createHero(entity);
        entityService.sendLogsToQueue("New hero created", 0);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHero); // 201 Created
    }

    @GetMapping("/enemy")
    public List<Entity> getAllEnemies(@RequestParam Integer heroID) {
        entityService.sendLogsToQueue("Random map sent from MapService to frontend", heroID);
        return entityService.getAllEnemies();
    }
}
