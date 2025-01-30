package com.example;

import jakarta.persistence.*;

@jakarta.persistence.Entity
@Table(name = "entity", schema = "public")
public class Entity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "name", nullable = false, length = 255)
    private String name;

    @Column(name = "type", nullable = false, length = 100)
    private String type;

    @Column(name = "level", nullable = false, columnDefinition = "int default 1")
    private Integer level;

    @Column(name = "dunjonnb", nullable = false, columnDefinition = "int default 1")
    private Integer dunjonNb;

    @Column(name = "maxhp", nullable = false)
    private Integer maxHP;

    @Column(name = "gold", nullable = false, columnDefinition = "int default 0")
    private Integer gold;

    @Column(name = "atk", nullable = false)
    private Integer atk;

    // Getters and Setters
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
    }

    public Integer getDunjonNb() {
        return dunjonNb;
    }

    public void setDunjonNb(Integer dunjonNb) {
        this.dunjonNb = dunjonNb;
    }

    public Integer getMaxHP() {
        return maxHP;
    }

    public void setMaxHP(Integer maxHP) {
        this.maxHP = maxHP;
    }

    public Integer getGold() {
        return gold;
    }

    public void setGold(Integer gold) {
        this.gold = gold;
    }

    public Integer getAtk() {
        return atk;
    }

    public void setAtk(Integer atk) {
        this.atk = atk;
    }
}