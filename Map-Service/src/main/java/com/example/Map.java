package com.example;

import com.fasterxml.jackson.databind.JsonNode;
import jakarta.persistence.*;
import org.hibernate.annotations.Type;
import com.vladmihalcea.hibernate.type.json.JsonBinaryType; // Import from vladmihalcea

@Entity
@Table(name = "map")
public class Map {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Type(JsonBinaryType.class)  // This is the CRUCIAL line you were missing
    @Column(name = "matrix", columnDefinition = "jsonb")
    private JsonNode matrix;

    // Getters and Setters
    public JsonNode getMatrix() {
        return matrix;
    }

    public void setMatrix(JsonNode matrix) {
        this.matrix = matrix;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }
}