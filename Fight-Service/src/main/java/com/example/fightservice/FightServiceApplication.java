package com.example.fightservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.Random;

@SpringBootApplication
public class FightServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(FightServiceApplication.class, args);
    }
}

@RestController
@RequestMapping("/fight")
class FightController {

    private final RestTemplate restTemplate;

    public FightController() {
        this.restTemplate = new RestTemplate();
    }

    @PostMapping("/calculate")
    public ResponseEntity<FightResult> calculateFight(@RequestBody FightRequest fightRequest) {
        // Fetch enemies from external service
        String enemyServiceUrl = "http://Entity-Service:8002/entity/enemy"; // Replace with actual URL
        ResponseEntity<Enemy[]> response = restTemplate.getForEntity(enemyServiceUrl, Enemy[].class);
        Enemy[] enemies = response.getBody();

        if (enemies == null || enemies.length == 0) {
            return ResponseEntity.badRequest().body(null);
        }

        // Select a random enemy
        Enemy enemy = enemies[new Random().nextInt(enemies.length)];

        // Initialize battle variables
        int heroCurrentHP = fightRequest.getCurrentHP();
        int enemyCurrentHP = enemy.getMaxHP();
        int heroATK = fightRequest.getATK();
        int enemyATK = enemy.getATK();

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

        FightResult result = new FightResult(fightRequest.getHeroId(), Math.max(heroCurrentHP, 0), Math.max(enemyCurrentHP, 0), enemy, battleLog.toString());
        return ResponseEntity.ok(result);
    }
}

class FightRequest {
    private final int heroId;
    private final int currentHP;
    private final int ATK;

    // Constructor with parameters
    public FightRequest(int heroId, int currentHP, int ATK) {
        this.heroId = heroId;
        this.currentHP = currentHP;
        this.ATK = ATK;
    }

    // Getters and setters
    public int getHeroId() {
        return heroId;
    }

    public int getCurrentHP() {
        return currentHP;
    }

    public int getATK() {
        return ATK;
    }
}

record FightResult(int heroId, int heroRemainingHP, int enemyRemainingHP, Enemy enemy, String battleLog) {
}

class Enemy {
    private String name;
    private int maxHP;
    private int ATK;

    public int getMaxHP() {
        return maxHP;
    }

    public int getATK() {
        return ATK;
    }

    public String getName() {
        return name;
    }
}
