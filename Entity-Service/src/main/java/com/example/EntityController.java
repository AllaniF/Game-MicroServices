package com.example;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
        return entityService.getAllHeroes();
    }

    @PostMapping("/heroes")
    public ResponseEntity<Entity> createHero(@RequestBody Entity entity) {
        Entity createdHero = entityService.createHero(entity);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdHero); // 201 Created
    }

//    @PutMapping("/heroes")  // No {heroId} in the path
//    public ResponseEntity<Entity> updateHero(@RequestBody Entity entityDetails) {
//        if (entityDetails.getId() == null) {
//            return ResponseEntity.badRequest().body(null); // Or a more informative error
//        }
//
//        Entity updatedHero = entityService.updateHero(entityDetails); // Pass the whole entity
//        return ResponseEntity.ok(updatedHero);
//    }

    @GetMapping("/enemy")
    public List<Entity> getAllEnemies() {
        return entityService.getAllEnemies();
    }
}
