package com.example.service;

import com.example.dto.LogDTO;
import com.example.model.Entity;
import com.example.repository.EntityRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Optional;


@Service
public class EntityService {

    private final EntityRepository entityRepository;

    private final RabbitTemplate rabbitTemplate;

    public EntityService(EntityRepository entityRepository, RabbitTemplate rabbitTemplate) {
        this.entityRepository = entityRepository;
        this.rabbitTemplate = rabbitTemplate;
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

    public void sendLogsToQueue(String log, Integer heroID) {
        LogDTO logDTO = new LogDTO();

        String timestamp = DateTimeFormatter.ISO_INSTANT.format(Instant.now());

        logDTO.setTimestamp(timestamp);
        logDTO.setId(heroID);
        logDTO.setLog(log);

        rabbitTemplate.convertAndSend("logs-queue", logDTO);
    }
}