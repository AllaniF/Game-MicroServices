package com.example.gamestate.dto;

public class GameStateDTO {
    private Integer id;
    private Integer level;
    private Integer dunjonNb;
    private Integer maxHP;
    private Integer atk;
    private Integer gold;
    private String upgrade;

    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }

    public Integer getLevel() { return level; }
    public void setLevel(Integer level) { this.level = level; }

    public Integer getDunjonNb() { return dunjonNb; }
    public void setDunjonNb(Integer dunjonNb) { this.dunjonNb = dunjonNb; }

    public Integer getMaxHP() { return maxHP; }
    public void setMaxHP(Integer maxHP) { this.maxHP = maxHP; }

    public Integer getAtk() { return atk; }
    public void setAtk(Integer atk) { this.atk = atk; }

    public Integer getGold() { return gold; }
    public void setGold(Integer gold) { this.gold = gold; }

    public String getUpgrade() { return upgrade; }
    public void setUpgrade(String upgrade) { this.upgrade = upgrade; }
}
