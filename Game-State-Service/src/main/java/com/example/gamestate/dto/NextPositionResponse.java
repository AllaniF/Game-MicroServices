package com.example.gamestate.dto;

import com.example.gamestate.model.Position;
import com.fasterxml.jackson.annotation.JsonProperty;

public class NextPositionResponse {
    private Position nextPosition;

    @JsonProperty("isFighting") // Forces JSON to use "isFighting"
    private boolean fighting;  // Change from isFighting → fighting

    @JsonProperty("isFinished") // Forces JSON to use "isFinished"
    private boolean finished;  // Change from isFinished → finished

    private int currentHP;
    private int ATK;

    // Getters and Setters
    public Position getNextPosition() {
        return nextPosition;
    }

    public void setNextPosition(Position nextPosition) {
        this.nextPosition = nextPosition;
    }

    public void setFighting(boolean fighting) {
        this.fighting = fighting;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }

    public int getCurrentHP() {
        return currentHP;
    }

    public void setCurrentHP(int currentHP) {
        this.currentHP = currentHP;
    }

    public int getATK() {
        return ATK;
    }

    public void setAtk(int atk) {
        this.ATK = atk;
    }
}
