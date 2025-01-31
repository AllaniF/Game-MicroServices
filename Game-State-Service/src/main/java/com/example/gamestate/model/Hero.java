package com.example.gamestate.model;


import java.io.Serial;
import java.io.Serializable;

public class Hero implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String name;
    private int level;
    private int dunjonNb;
    private int id;
    private int currentHP;
    private int maxHP;
    private int gold;
    private int atk;

    // Getters and Setters
    public String getName() {
        return name;
    }

    public int getLevel() {
        return level;
    }

    public int getDunjonNb() { return dunjonNb; }

    public int getId() {
        return id;
    }

    public int getMaxHP() {
        return maxHP;
    }

    public int getGold() {
        return gold;
    }

    public int getAtk() {
        return atk;
    }

    public int getCurrentHP() { return currentHP; }

    public void setCurrentHP(int currentHP) {this.currentHP = currentHP;}

    public void setAtk(int i) { this.atk = i; }

    public void setMaxHP(int i) { this.maxHP = i; }

    public void setDunjunNb(int i) { this.dunjonNb = i; }

    public void setLevel(int i) { this.level = i; }
}

