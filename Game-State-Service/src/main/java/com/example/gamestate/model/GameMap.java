package com.example.gamestate.model;

import java.io.Serial;
import java.io.Serializable;

public class GameMap implements Serializable {
    private Position currentPosition;
    private int id;
    private String[][] matrix;

    @Serial
    private static final long serialVersionUID = 1L;

    // Default constructor
    public GameMap() {
        this.currentPosition = new Position(0, 0);
    }

    // Constructor with map
    public GameMap(String[][] matrix) {
        this();
        this.matrix = matrix;
    }

    // Constructor with matrix
    public GameMap(int id, String[][] matrix) {
        this();
        this.id = id;
        this.matrix = matrix;
    }

    // Getter and setter for currentPosition
    public Position getCurrentPosition() {
        return currentPosition;
    }

    public void setCurrentPosition(Position currentPosition) {
        this.currentPosition = currentPosition;
    }

    // Getter and setter for id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    // Getter and setter for matrix
    public String[][] getMatrix() {
        return matrix;
    }

    public void setMatrix(String[][] matrix) {
        this.matrix = matrix;
    }

    // Method to check for a valid move
    public String isValidMove(Position newPos) {
        if (matrix == null || newPos.getX() < 0 || newPos.getX() >= matrix.length ||
                newPos.getY() < 0 || newPos.getY() >= matrix[0].length) {
            return "Invalid move";
        }
        if ("E".equals(matrix[newPos.getY()][newPos.getX()])){
            return "Valid move";
        } else if ("F".equals(matrix[newPos.getY()][newPos.getX()])) {
            return "Finished";
        }

        return "Invalid move";
    }
}
