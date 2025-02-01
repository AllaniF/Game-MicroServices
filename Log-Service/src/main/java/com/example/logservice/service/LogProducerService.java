package com.example.logservice.service;

import com.example.logservice.model.Log;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

@Service
public class LogProducerService {

    private final RabbitTemplate rabbitTemplate;

    public LogProducerService(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendLog(String message, Integer heroID) {
        Log log = new Log();
        log.setHeroID(heroID);
        log.setLog(message);

        rabbitTemplate.convertAndSend("logs-queue", log);
    }
}
