package com.example.fightservice.model;

public record FightResult(int heroId, int heroRemainingHP, int enemyRemainingHP, Enemy enemy, String battleLog, String result) {
}
