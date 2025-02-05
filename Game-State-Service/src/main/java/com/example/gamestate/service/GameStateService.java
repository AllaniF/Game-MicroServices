package com.example.gamestate.service;

import com.example.gamestate.dto.GameStateDTO;
import com.example.gamestate.dto.LogDTO;
import com.example.gamestate.dto.NextPositionResponse;
import com.example.gamestate.model.Game;
import com.example.gamestate.model.GameMap;
import com.example.gamestate.model.Hero;
import com.example.gamestate.model.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.Objects;
import java.util.Random;

@Service
public class GameStateService {

    private static final String GAME_KEY = "game_state";
    private final RabbitTemplate rabbitTemplate;

    @Autowired
    private RedisTemplate<String, Object> redisTemplate;

    public GameStateService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void saveGame(Game game) {
        redisTemplate.opsForValue().set(GAME_KEY, game);
    }

    public Game getGame() {
        return (Game) redisTemplate.opsForValue().get(GAME_KEY);
    }

    public void createGame() {
        Game game = new Game();
        saveGame(game);  // Store it in Redis
    }

    public void saveHero(Hero hero) {
        Game game = getGame();
        if (game == null) {
            throw new IllegalStateException("No existing game found. Create a game before adding a hero.");
        }
        hero.setCurrentHP(hero.getMaxHP());
        game.setHero(hero);
        saveGame(game);
    }

    public Hero getHero() {
        Game game = getGame();
        return game != null ? game.getHero() : null;
    }

    public void saveMap(GameMap gameMap) {
        Game game = getGame();
        if (game == null) {
            throw new IllegalStateException("No existing game found. Create a game before adding a map.");
        }
        game.setGameMap(gameMap);
        saveGame(game);
    }

    public GameMap getMap() {
        Game game = getGame();
        return game != null ? game.getGameMap() : null;
    }

    public NextPositionResponse move(String direction) {
        Game game = getGame();

        NextPositionResponse response = getNextPosition(game, direction);

        // Randomly determine if there is a fight
        isFighting(response);


        Hero hero = game.getHero();
        response.setCurrentHP(hero.getCurrentHP());
        response.setAtk(hero.getAtk());

        return response;
    }

    private Position getNewPosition(Game game, String direction) {
        Position current = game.getGameMap().getCurrentPosition();

        return switch (direction.toLowerCase()) {
            case "up" -> new Position(current.getX(), current.getY() - 1); // Move up (decrease y)
            case "down" -> new Position(current.getX(), current.getY() + 1); // Move down (increase y)
            case "right" -> new Position(current.getX() + 1, current.getY()); // Move right (increase x)
            case "left" -> new Position(current.getX() - 1, current.getY()); // Move left (decrease x)
            default -> throw new IllegalArgumentException("Invalid direction");
        };
    }

    private NextPositionResponse getNextPosition(Game game, String direction) {
        GameMap map = game.getGameMap();
        Position currentPosition = map.getCurrentPosition();
        Position newPosition = getNewPosition(game, direction);

        NextPositionResponse response = new NextPositionResponse();

        if (Objects.equals(map.isValidMove(newPosition), "Invalid move")) {
            response.setNextPosition(currentPosition);
            response.setFinished(false);
        } else if (Objects.equals(map.isValidMove(newPosition), "Finished")) {
            response.setNextPosition(newPosition);
            map.setCurrentPosition(newPosition);
            saveMap(game.getGameMap());
            response.setFinished(true);
        } else if (Objects.equals(map.isValidMove(newPosition), "Valid move")) {
            response.setNextPosition(newPosition);
            map.setCurrentPosition(newPosition);
            saveMap(game.getGameMap());
            response.setFinished(false);
        }
        return response;
    }

    private void isFighting(NextPositionResponse response) {
        boolean isFighting = new Random().nextBoolean();
        response.setFighting(isFighting);
    }

    public void updateHeroHp(int remainingHp) {
        Game game = getGame();

        if (game != null && game.getHero() != null) {
            Hero hero = game.getHero();
            hero.setCurrentHP(remainingHp);
            saveHero(hero);
            saveGame(game); // Save back to Redis
        }
    }

    public void upgradeHero(String upgradeType) {
        Game game = getGame();

        if (game != null && game.getHero() != null) {
            Hero hero = game.getHero();

            switch (upgradeType.toLowerCase()) {
                case "hp":
                    int newHP = (int) (hero.getMaxHP() * 1.1); // Increase HP by 10%
                    hero.setMaxHP(newHP);
                    break;
                case "atk":
                    int newATK = (int) (hero.getAtk() * 1.05); // Increase ATK by 5%
                    hero.setAtk(newATK);
                    break;
                default:
                    throw new IllegalArgumentException("Invalid upgrade type: " + upgradeType);
            }

            hero.setDunjunNb(hero.getDunjonNb() +1 );
            hero.setLevel(hero.getLevel() +1 );
            saveHero(hero);

            saveGame(game); // Save the updated hero back to Redis
        }

        GameStateDTO gameStateDTO = createGameStateDTO();
        sendGameStateToQueue(gameStateDTO);

    }

    private GameStateDTO createGameStateDTO() {
        // Get game state
        Game game = getGame();
        Hero hero = game.getHero();

        GameStateDTO gameStateDTO = new GameStateDTO();

        // Setting every information needed to update the hero
        gameStateDTO.setId(hero.getId());
        gameStateDTO.setLevel(hero.getLevel());
        gameStateDTO.setDunjonNb(hero.getDunjonNb());
        gameStateDTO.setMaxHP(hero.getMaxHP());
        gameStateDTO.setAtk(hero.getAtk());
        gameStateDTO.setGold(hero.getGold());

        return  gameStateDTO;
    }

    private void sendGameStateToQueue(GameStateDTO gameStateDTO) {
        rabbitTemplate.convertAndSend("update-hero-queue", gameStateDTO);
    }

    public void sendLogsToQueue(String log) {
        // Get hero
        Game game = getGame();
        Hero hero = game.getHero();

        LogDTO logDTO = new LogDTO();

        String timestamp = DateTimeFormatter.ISO_INSTANT.format(Instant.now());

        logDTO.setTimestamp(timestamp);
        logDTO.setId(hero.getId());
        logDTO.setLog(log);

        rabbitTemplate.convertAndSend("logs-queue", logDTO);
    }
}
