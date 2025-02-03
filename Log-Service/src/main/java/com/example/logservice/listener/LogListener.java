package com.example.logservice.listener;

import com.example.logservice.dto.LogDTO;
import com.example.logservice.model.Log;
import com.example.logservice.service.LogService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@Service
public class LogListener {

    private final LogService logService;

    public LogListener(LogService logService) {
        this.logService = logService;
    }

    @RabbitListener(queues = "logs-queue")
    public void receiveMessage(LogDTO logDTO) {
        // Convert LogDTO to Log entity
        Log log = new Log();
        log.setHeroID(logDTO.getId());  // Map `id` from DTO to `heroID`
        log.setTimestamp(logDTO.getTimestamp());
        log.setLog(logDTO.getLog());

        // Save to database
        logService.saveLog(log);
    }
}
