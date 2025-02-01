package com.example.fightservice.service;

import com.example.fightservice.model.Enemy;
import com.example.fightservice.model.FightRequest;
import com.example.fightservice.model.FightResult;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@Service
public class FightService {

    private final RestTemplate restTemplate;

    public FightService() {
        this.restTemplate = new RestTemplate();
    }

    public ResponseEntity<FightResult> calculateFight(FightRequest fightRequest) {
        // Fetch enemies from external service
        String enemyServiceUrl = "http://Entity-Service:8002/entity/enemy"; // Replace with actual URL
        ResponseEntity<Enemy[]> response = restTemplate.getForEntity(enemyServiceUrl, Enemy[].class);
        Enemy[] enemies = response.getBody();

        if (enemies == null || enemies.length == 0) {
            return ResponseEntity.badRequest().body(null);
        }

        // Select a random enemy
        Enemy enemy = enemies[new Random().nextInt(enemies.length)];

        // Run the fight simulation
        FightResult result = simulateFight(fightRequest, enemy);
        return ResponseEntity.ok(result);
    }

    private FightResult simulateFight(FightRequest fightRequest, Enemy enemy) {
        int heroCurrentHP = fightRequest.getCurrentHP();
        int enemyCurrentHP = enemy.getMaxHP();
        int heroATK = fightRequest.getATK();
        int enemyATK = enemy.getAtk();

        StringBuilder battleLog = new StringBuilder();

        // Turn-based battle
        while (heroCurrentHP > 0 && enemyCurrentHP > 0) {
            // Hero attacks enemy
            enemyCurrentHP -= heroATK;
            battleLog.append("Hero attacks enemy for ").append(heroATK).append(" damage. Enemy HP: ").append(Math.max(enemyCurrentHP, 0)).append("\n");

            if (enemyCurrentHP <= 0) {
                break;
            }

            // Enemy attacks hero
            heroCurrentHP -= enemyATK;
            battleLog.append("Enemy attacks hero for ").append(enemyATK).append(" damage. Hero HP: ").append(Math.max(heroCurrentHP, 0)).append("\n");
        }

        String winner = heroCurrentHP > 0 ? "Hero" : "Enemy";
        battleLog.append(winner).append(" wins the battle!");

        String result = heroCurrentHP > 0 ? "win" : "lose";

        return new FightResult(fightRequest.getHeroId(), Math.max(heroCurrentHP, 0), Math.max(enemyCurrentHP, 0), enemy, battleLog.toString(), result);
    }
}
