package com.example.gamestate.model;

import java.io.Serial;
import java.io.Serializable;

public class Game implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private GameMap gameMap;
    private Hero hero;

    public Game() {}

    public Game(GameMap gameMap, Hero hero) {
        this.gameMap = gameMap;
        this.hero = hero;
    }

    public GameMap getGameMap() {
        return gameMap;
    }

    public void setGameMap(GameMap gameMap) {
        this.gameMap = gameMap;
    }

    public Hero getHero() {
        return hero;
    }

    public void setHero(Hero hero) {
        this.hero = hero;
    }
}
