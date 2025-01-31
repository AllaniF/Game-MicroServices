package com.example.gamestate.service;

import com.example.gamestate.dto.GameStateDTO;
import com.example.gamestate.dto.NextPositionResponse;
import com.example.gamestate.model.Game;
import com.example.gamestate.model.GameMap;
import com.example.gamestate.model.Hero;
import com.example.gamestate.model.Position;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

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

    public void saveHero(Hero hero) {
        Game game = getGame();
        if (game == null) {
            game = new Game();
        }
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
            game = new Game();
        }
        game.setGameMap(gameMap);
        saveGame(game);
    }

    public GameMap getMap() {
        Game game = getGame();
        return game != null ? game.getGameMap() : null;
    }

    public NextPositionResponse getNextPosition(String direction, Game game) {
        // Step 1: Fetch map from Redis
        GameMap map = game.getGameMap();

        // Step 2: Check if direction is valid (pseudocode, adapt as needed)
        Position currentPosition = map.getCurrentPosition();
        Position newPosition = getNewPosition(currentPosition, direction);

        // Step 3: Create the response
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

        // Step 4: Randomly determine if there is a fight
        // TODO :
        //  choose fight probability
        //  remove fight if stay on same position
        boolean isFighting = new Random().nextBoolean();  // 50% chance for a fight

        // Step 5: Fetch hero from the game
        Hero hero = game.getHero();


        response.setFighting(isFighting);
        response.setCurrentHP(hero.getCurrentHP());
        response.setAtk(hero.getAtk());

        return response;
    }

    private Position getNewPosition(Position current, String direction) {
        // Implement logic to calculate new position based on direction (e.g., "up", "down")
        return switch (direction.toLowerCase()) {
            case "up" -> new Position(current.getX(), current.getY() - 1); // Move up (decrease y)
            case "down" -> new Position(current.getX(), current.getY() + 1); // Move down (increase y)
            case "right" -> new Position(current.getX() + 1, current.getY()); // Move right (increase x)
            case "left" -> new Position(current.getX() - 1, current.getY()); // Move left (decrease x)
            default -> throw new IllegalArgumentException("Invalid direction");
        };
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
}
