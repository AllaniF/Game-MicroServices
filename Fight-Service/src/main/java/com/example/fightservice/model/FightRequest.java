package com.example.fightservice.model;

public class FightRequest {
    private final int heroId;
    private final int currentHP;
    private final int atk;

    public FightRequest(int heroId, int currentHP, int atk) {
        this.heroId = heroId;
        this.currentHP = currentHP;
        this.atk = atk;
    }

    public int getHeroId() {
        return heroId;
    }

    public int getCurrentHP() {
        return currentHP;
    }

    public int getAtk() {
        return atk;
    }
}
