package com.example.logservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String LOG_QUEUE = "logs-queue";

    @Bean
    public Queue logQueue() {
        return new Queue(LOG_QUEUE, true);
    }
}
