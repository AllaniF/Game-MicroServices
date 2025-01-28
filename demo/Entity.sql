

CREATE TABLE IF NOT EXISTS Entity (
    ID INT PRIMARY KEY,
    Name VARCHAR(255) NOT NULL,
    Type VARCHAR(100) NOT NULL,
    Level INT DEFAULT 1,
    DunjonNb INT DEFAULT 1,
    MaxHP INT NOT NULL,
    Gold INT DEFAULT 0,
    ATK INT NOT NULL
    );

INSERT INTO Entity (ID, Name, Type, Level, DunjonNb, MaxHP, Gold, ATK)
VALUES
    (1, 'Arthas', 'Warrior', 10, 3, 150, 200, 35);
