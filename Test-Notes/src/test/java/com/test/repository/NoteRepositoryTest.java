package com.test.repository;

import com.test.model.Note;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;

class NoteRepositoryTest {
    private NoteRepository noteRepository;

    @BeforeEach
    void setUp() {
        // Inicializa el repositorio antes de cada test
        noteRepository = new NoteRepository();
    }

    @Test
    void testSaveAndFindAll() {
        // Crear una nueva nota
        Note note = new Note("Nueva Nota 1", "Esta es una nota", "Erick");
        noteRepository.save(note);

        assertEquals(1, noteRepository.findAll().size());

        assertEquals(note, noteRepository.findAll().get(0));
    }

    @Test //buscarID
    void testFindById() {
        Note note = new Note("Título", "Contenido" , "Author");
        noteRepository.save(note);

        assertTrue(noteRepository.findById(note.getId()).isPresent());
        assertEquals(note, noteRepository.findById(note.getId()).get());
    }

    @Test //Eliminar
    void testDelete() {
        Note note = new Note("Título", "Contenido" , "Author");
        noteRepository.save(note);
        noteRepository.delete(note.getId());

        assertTrue(noteRepository.findAll().isEmpty());
    }
}
