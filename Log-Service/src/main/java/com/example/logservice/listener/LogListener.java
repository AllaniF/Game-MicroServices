package com.example.logservice.listener;

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

    @RabbitListener(queues = "log-queue")
    public void receiveLogMessage(Log log) {
        logService.saveLog(log);  // Save log to database
    }
}
