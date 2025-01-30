package com.example.gamestate;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class GameStateApplication {

    public static void main(String[] args) {
        SpringApplication.run(GameStateApplication.class, args);
    }

}
