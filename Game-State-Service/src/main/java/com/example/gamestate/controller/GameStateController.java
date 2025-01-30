package com.example.gamestate.controller;

import com.example.gamestate.dto.CombatResultRequest;
import com.example.gamestate.dto.NextPositionResponse;
import com.example.gamestate.model.*;
import com.example.gamestate.service.GameStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game-state")
public class GameStateController {

    @Autowired
    private GameStateService gameStateService;

    // Store full game state
    @PostMapping
    public String storeGame(@RequestBody Game game) {
        gameStateService.saveGame(game);
        return "Game state saved successfully!";
    }

    // Retrieve full game state
    @GetMapping
    public Game getGame() {
        return gameStateService.getGame();
    }

    // Store hero separately
    @PostMapping("/selected-hero")
    public String storeHero(@RequestBody Hero hero) {
        hero.setCurrentHP(hero.getMaxHP());
        gameStateService.saveHero(hero);
        return "Hero saved successfully!";
    }

    // Retrieve hero
    @GetMapping("/selected-hero")
    public Hero getHero() {
        return gameStateService.getHero();
    }

    // Store game map separately
    @PostMapping("/map")
    public String storeMap(@RequestBody GameMap gameMap) {
        gameStateService.saveMap(gameMap);
        return "Game map saved successfully!";
    }

    // Retrieve game map
    @GetMapping("/map")
    public GameMap getMap() {
        return gameStateService.getMap();
    }

    @PostMapping("/next-position")
    public NextPositionResponse getNextPosition(@RequestBody Direction directionRequest) {
        return gameStateService.getNextPosition(directionRequest.getDirection(), gameStateService.getGame());
    }

    @PostMapping("/combat-results")
    public String saveCombatResults(@RequestBody CombatResultRequest request) {
        gameStateService.updateHeroHp(request.getRemainingHp());
        return "Hero HP updated successfully!";
    }
}