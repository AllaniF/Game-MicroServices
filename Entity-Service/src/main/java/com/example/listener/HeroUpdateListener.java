package com.example.listener;

import com.example.service.EntityService;
import com.example.model.Entity;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class HeroUpdateListener {

    private final EntityService entityService;

    public HeroUpdateListener(EntityService entityService) {
        this.entityService = entityService;
    }

    @RabbitListener(queues = "update-hero-queue")
    public void receiveHeroUpdate(Map<String, Object> heroData) {
        System.out.println("Received hero update: " + heroData);

        // Extract values from the map
        Integer id = (Integer) heroData.get("id");
        Integer level = (Integer) heroData.get("level");
        Integer dunjonNb = (Integer) heroData.get("dunjonNb");
        Integer maxHP = (Integer) heroData.get("maxHP");
        Integer gold = (Integer) heroData.get("gold");
        Integer atk = (Integer) heroData.get("atk");

        // Update existing Entity instance or create a new one
        Entity hero = new Entity();
        hero.setId(id);
        hero.setLevel(level);
        hero.setDunjonNb(dunjonNb);
        hero.setMaxHP(maxHP);
        hero.setGold(gold);
        hero.setAtk(atk);

        // Save updated hero
        entityService.updateHeros(id, hero);
    }
}