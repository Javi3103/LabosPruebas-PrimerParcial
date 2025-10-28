package com.test.repository;

import com.test.model.Note;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class NoteRepository {
    private List<Note> notes = new ArrayList<>();

    public Note save(Note note) {
        notes.add(note);
        return note;
    }

    public List<Note> findAll() {
        return new ArrayList<>(notes);
    }

    public Optional<Note> findById(String id) {
        return notes.stream()
                .filter(note -> note.getId().equals(id))
                .findFirst();
    }

    public void delete(String id) {
        notes.removeIf(note -> note.getId().equals(id));
    }

    // Nuevos métodos de búsqueda
    public List<Note> findByAuthor(String author) {
        return notes.stream()
                .filter(note -> note.getAuthor().equals(author))
                .collect(Collectors.toList());
    }
}
