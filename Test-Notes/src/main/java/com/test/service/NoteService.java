package com.test.service;

import com.test.model.Note;
import com.test.repository.NoteRepository;
import java.util.List;
import java.util.Optional;

public class NoteService {
    private NoteRepository noteRepository;

    public NoteService(NoteRepository noteRepository) {
        this.noteRepository = noteRepository;
    }

    public Note createNote(String title, String content, String author) {
        Note note = new Note(title, content, author);

        // Validación antes de guardar
        if (!note.isValidNote()) {
            throw new IllegalArgumentException("Datos de nota inválidos: " +
                    "\nTítulo (min 3 caract.): " + note.isValidTitle() +
                    "\nContenido (min 10 caract.): " + note.isValidContent() +
                    "\nAutor (min 2 caract.): " + note.isValidAuthor()
            );
        }

        return noteRepository.save(note);
    }

    // Métodos existentes actualizados para incluir autor
    public List<Note> getAllNotes() {
        return noteRepository.findAll();
    }

    public Optional<Note> getNoteById(String id) {
        return noteRepository.findById(id);
    }

    public void deleteNote(String id) {
        noteRepository.delete(id);
    }

    public Note updateNote(String id, String newTitle, String newContent, String newAuthor) {
        Optional<Note> optionalNote = noteRepository.findById(id);
        if (optionalNote.isPresent()) {
            Note note = optionalNote.get();
            note.setTitle(newTitle);
            note.setContent(newContent);
            note.setAuthor(newAuthor);

            if (!note.isValidNote()) {
                throw new IllegalArgumentException("Datos de actualización inválidos");
            }

            return note;
        }
        throw new RuntimeException("Nota no encontrada");
    }

    // Métodos adicionales de búsqueda
    public List<Note> getNotesByAuthor(String author) {
        return noteRepository.findAll().stream()
                .filter(note -> note.getAuthor().equals(author))
                .toList();
    }
}