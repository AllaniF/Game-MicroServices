package com.example;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;


@Service
public class EntityService {

    private final EntityRepository entityRepository;

    public EntityService(EntityRepository entityRepository) {
        this.entityRepository = entityRepository;
    }

    public List<Entity> getAllHeroes() {
        return entityRepository.findByType("Hero");
    }

    public Entity createHero(Entity entity) {
        entity.setType("Hero");
        if (entity.getType() == null) {
            entity.setType("Hero"); // Or perhaps have a separate default hero type config
        }
        if (entity.getLevel() == null) {
            entity.setLevel(0);
        }
        if (entity.getDunjonNb() == null) {
            entity.setDunjonNb(0);
        }
        if (entity.getMaxHP() == null) {
            entity.setMaxHP(100);
        }
        if (entity.getGold() == null) {
            entity.setGold(0);
        }
        if (entity.getAtk() == null) {
            entity.setAtk(20);
        }

        return entityRepository.save(entity);
    }

    public Entity updateHeros(Integer heroId, Entity entityDetails) {
        Optional<Entity> entity = entityRepository.findById(heroId);
        if (entity.isPresent()) {
            Entity updatedEntity = entity.get();
            updatedEntity.setLevel(entityDetails.getLevel());
            updatedEntity.setDunjonNb(entityDetails.getDunjonNb());
            updatedEntity.setMaxHP(entityDetails.getMaxHP());
            updatedEntity.setGold(entityDetails.getGold());
            updatedEntity.setAtk(entityDetails.getAtk());
            return entityRepository.save(updatedEntity);
        } else {
            throw new RuntimeException("Hero not found with id " + heroId);
        }
    }

    public List<Entity> getAllEnemies() {
        return entityRepository.findByType("Enemy");
    }
}