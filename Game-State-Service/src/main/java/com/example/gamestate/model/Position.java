package com.example.gamestate.model;

public class Position {
    private int x;
    private int y;

    // Default constructor
    public Position() {}

    // Constructors, Getters, and Setters
    public Position(int x, int y) {
        this.x = x;
        this.y = y;
    }


    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }
}

