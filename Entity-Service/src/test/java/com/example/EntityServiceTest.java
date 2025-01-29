package com.example;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class EntityServiceTest {

    @Mock
    private EntityRepository entityRepository;

    @InjectMocks
    private EntityService entityService;

    public EntityServiceTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllHeroes() {
        Entity hero = new Entity();
        hero.setType("hero");
        when(entityRepository.findByType("hero")).thenReturn(Arrays.asList(hero));

        List<Entity> heroes = entityService.getAllHeroes();
        assertEquals(1, heroes.size());
        verify(entityRepository, times(1)).findByType("hero");
    }

    @Test
    public void testCreateHero() {
        Entity hero = new Entity();
        hero.setType("hero");
        when(entityRepository.save(any(Entity.class))).thenReturn(hero);

        Entity createdHero = entityService.createHero(hero);
        assertEquals("hero", createdHero.getType());
        verify(entityRepository, times(1)).save(hero);
    }

    @Test
    public void testUpdateHero() {
        Entity hero = new Entity();
        hero.setId(1);
        hero.setType("Hero");
        when(entityRepository.findById(1)).thenReturn(Optional.of(hero));
        when(entityRepository.save(any(Entity.class))).thenReturn(hero);

        Entity updatedHero = entityService.updateHero(hero);
        assertEquals("Hero", updatedHero.getType());
        verify(entityRepository, times(1)).findById(1);
        verify(entityRepository, times(1)).save(hero);
    }

    @Test
    public void testGetAllEnemies() {
        Entity enemy = new Entity();
        enemy.setType("enemy");
        when(entityRepository.findByType("enemy")).thenReturn(Arrays.asList(enemy));

        List<Entity> enemies = entityService.getAllEnemies();
        assertEquals(1, enemies.size());
        verify(entityRepository, times(1)).findByType("enemy");
    }
}