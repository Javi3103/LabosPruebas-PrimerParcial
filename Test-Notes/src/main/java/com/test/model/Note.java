package com.test.model;

import java.time.LocalDateTime;
import java.util.UUID;

public class Note {
    private String id;
    private String title;
    private String content;
    private String author;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    public Note(String title, String content, String author) {
        this.id = UUID.randomUUID().toString();
        this.title = title;
        this.content = content;
        this.author = author;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }

    // Getters y Setters
    public String getId() { return id; }
    public String getTitle() { return title; }
    public void setTitle(String title) {
        this.title = title;
        this.updatedAt = LocalDateTime.now();
    }
    public String getContent() { return content; }
    public void setContent(String content) {
        this.content = content;
        this.updatedAt = LocalDateTime.now();
    }
    public String getAuthor() { return author; }
    public void setAuthor(String author) {
        this.author = author;
        this.updatedAt = LocalDateTime.now();
    }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public LocalDateTime getUpdatedAt() { return updatedAt; }

    // Métodos de validación
    public boolean isValidTitle() {
        return title != null && !title.trim().isEmpty() && title.length() >= 3;
    }

    public boolean isValidContent() {

        return content != null && !content.trim().isEmpty() && content.length() >= 10;
    }

    public boolean isValidAuthor() {

        return author != null && !author.trim().isEmpty() && author.length() >= 2;
    }

    public boolean isValidNote() {

        return isValidTitle() && isValidContent() && isValidAuthor();
    }
}
