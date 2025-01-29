package com.example;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.context.ActiveProfiles;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class EntityControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllHeroes() throws Exception {
        mockMvc.perform(get("/entity/heroes"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testCreateHero() throws Exception {
        String heroJson = "{\"name\":\"HeroName\"}";
        mockMvc.perform(post("/entity/heroes")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(heroJson))
                .andExpect(status().isCreated())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testUpdateHero() throws Exception {
        String heroJson = "{\"name\":\"UpdatedHeroName\",\"level\":2,\"dunjonNb\":1,\"maxHP\":100,\"ATK\":10,\"gold\":50}";
        mockMvc.perform(put("/entity/heroes/1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(heroJson))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }

    @Test
    public void testGetAllEnemies() throws Exception {
        mockMvc.perform(get("/entity/enemy"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON));
    }
}