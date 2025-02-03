package com.example.fightservice.controller;

import com.example.fightservice.model.FightRequest;
import com.example.fightservice.model.FightResult;
import com.example.fightservice.service.FightService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/fight")
public class FightController {
    private final FightService fightService;

    public FightController(FightService fightService) {
        this.fightService = fightService;
    }

    @PostMapping("/calculate")
    public ResponseEntity<FightResult> calculateFight(@RequestBody FightRequest fightRequest) {
        ResponseEntity<FightResult> result = fightService.calculateFight(fightRequest);
        fightService.sendLogsToQueue("Fight calculated", fightRequest);
        return result;
    }
}
