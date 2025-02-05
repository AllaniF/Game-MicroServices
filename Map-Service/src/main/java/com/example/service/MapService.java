package com.example.service;

import com.example.dto.LogDTO;
import com.example.model.Map;
import com.example.repository.MapRepository;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Random;

@Service
public class MapService {

    @Autowired
    private MapRepository mapRepository;

    private final RabbitTemplate rabbitTemplate;

    public MapService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public Map getRandomMap() {
        long count = mapRepository.count();
        if (count == 0) {
            return null; // No maps in the database
        }

        Random random = new Random();
        // Generate a random number between 1 and count (inclusive)
        int randomIndex = random.nextInt((int) count) + 1; // +1 to shift the range

        // Use Pageable to fetch only ONE map at the random index -1 because Pageable starts at 0
        return mapRepository.findAll(org.springframework.data.domain.PageRequest.of(randomIndex-1, 1)).getContent().get(0);
    }

    public Map createMap(Map map) {
        return mapRepository.save(map);
    }

    public List<Map> getAllMaps() {
        return mapRepository.findAll();
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