package com.test.service;





import com.test.model.Note;
import com.test.repository.NoteRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.when;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

public class NoteServiceTest {
    private NoteRepository noteRepository;
    private NoteService noteService;

    @BeforeEach
    void setUp() {
        // Usamos una implementación real de NoteRepository (en este caso, una base de datos real o memoria)
        noteRepository = new NoteRepository(); // Suponiendo que hay una implementación concreta de NoteRepository
        noteService = new NoteService(noteRepository);
    }

    @Test
    void testCreateNote() {
        Note note = new Note("Nueva Nota 1", "Esta es una nota", "Erick");
        Note createdNote = noteService.createNote("Nueva Nota 1", "Esta es una nota", "Erick");

        assertNotNull(createdNote);
        assertEquals("Nueva Nota 1", createdNote.getTitle());
    }

    @Test
    void testUpdateNote() { //actualizar
        Note existingNote = new Note("Título", "Contenido" , "Author");
        when(noteRepository.findById(existingNote.getId()))
                .thenReturn(Optional.of(existingNote));

        Note updatedNote = noteService.updateNote(
                existingNote.getId(),
                "Nuevo Título",
                "Nuevo Contenido",
                "Author"
        );

        assertEquals("Nuevo Título", updatedNote.getTitle());
        assertEquals("Nuevo Contenido", updatedNote.getContent());
        assertEquals("Author", updatedNote.getAuthor());
    }

    @Test //Actualizar nota que no existe
    void testUpdateNonExistentNote() {
        when(noteRepository.findById(anyString()))
                .thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> {
            noteService.updateNote("id-inexistente", "Título", "Contenido", "Author");
        });
    }
}
