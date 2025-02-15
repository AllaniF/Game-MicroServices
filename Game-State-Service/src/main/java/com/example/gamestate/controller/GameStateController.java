package com.example.gamestate.controller;

import com.example.gamestate.dto.CombatResultRequest;
import com.example.gamestate.dto.NextPositionResponse;
import com.example.gamestate.dto.UpgradeHeroRequest;
import com.example.gamestate.model.*;
import com.example.gamestate.service.GameStateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game-state")
public class GameStateController {

    @Autowired
    private GameStateService gameStateService;

    @GetMapping("/new-game")
    public String createNewGame() {
        gameStateService.createGame();
        return "New game created successfully!";
    }

    // Store hero separately
    @PostMapping("/selected-hero")
    public String storeHero(@RequestBody Hero hero) {
        gameStateService.saveHero(hero);
        gameStateService.sendLogsToQueue("Hero saved successfully!");
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
        gameStateService.sendLogsToQueue("Game map saved successfully!");
        return "Game map saved successfully!";
    }

    // Retrieve game map
    @GetMapping("/map")
    public GameMap getMap() {
        return gameStateService.getMap();
    }

    @PostMapping("/next-position")
    public NextPositionResponse getNextPosition(@RequestBody Direction directionRequest) {
        NextPositionResponse nextPositionResponse = gameStateService.move(directionRequest.getDirection());
        gameStateService.sendLogsToQueue("Next position calculated successfully!");
        return nextPositionResponse;
    }

    @PostMapping("/combat-results")
    public String saveCombatResults(@RequestBody CombatResultRequest request) {
        gameStateService.updateHeroHp(request.getRemainingHp());
        gameStateService.sendLogsToQueue("Combat results saved successfully!");
        return "Hero HP updated successfully!";
    }

    @PostMapping("/upgrade-hero")
    public String upgradeHero(@RequestBody UpgradeHeroRequest request) {
        gameStateService.upgradeHero(request.getUpgrade());
        gameStateService.sendLogsToQueue("Hero upgraded successfully!");
        return "New stats for hero updated successfully!";
    }
}