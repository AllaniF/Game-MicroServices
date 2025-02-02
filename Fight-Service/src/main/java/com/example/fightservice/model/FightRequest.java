package com.example.fightservice.model;

public class FightRequest {
    private final int heroId;
    private final int currentHP;
    private final int ATK;

    public FightRequest(int heroId, int currentHP, int ATK) {
        this.heroId = heroId;
        this.currentHP = currentHP;
        this.ATK = ATK;
    }

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
