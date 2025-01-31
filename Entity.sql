CREATE TABLE IF NOT EXISTS Entity (
    ID SERIAL PRIMARY KEY,  -- Auto-incrementing ID
    Name VARCHAR(255) NOT NULL,
    Type VARCHAR(100) NOT NULL,
    Level INT DEFAULT 0,
    DunjonNb INT DEFAULT 0,
    MaxHP INT NOT NULL,
    Gold INT DEFAULT 0,
    ATK INT NOT NULL
    );

-- Heroes
INSERT INTO Entity (Name, Type, Level, DunjonNb, MaxHP, Gold, ATK)
VALUES
    ('Arthas', 'Hero', 10, 3, 150, 200, 35),
    ('Jaina', 'Hero', 8, 2, 100, 150, 45),
    ('Thrall', 'Hero', 12, 4, 180, 250, 40),
    ('Valeera', 'Hero', 9, 3, 120, 180, 50),
    ('Uther', 'Hero', 15, 5, 200, 300, 30);

-- Enemies
INSERT INTO Entity (Name, Type, Level, DunjonNb, MaxHP, Gold, ATK)
VALUES
    ('Gnoll', 'Enemy', 2, 1, 50, 10, 15),
    ('Orc Grunt', 'Enemy', 5, 2, 80, 20, 20),
    ('Dark Sorcerer', 'Enemy', 8, 3, 120, 50, 30),
    ('Undead Warrior', 'Enemy', 10, 4, 150, 80, 35),
    ('Black Dragon', 'Enemy', 15, 5, 300, 500, 60);