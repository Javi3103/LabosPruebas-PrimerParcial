package com.test.model;




import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;


public class NoteTest {

    private Note note;

    @BeforeEach
    void setUp() {
        // Crear un mock de la clase Note
        note = mock(Note.class);
    }

    @Test
    void testNullContentWithMockito() {
        // Crear un mock de la clase Note
        Note mockNote = mock(Note.class);

        // Configurar comportamiento para devolver null
        when(mockNote.getContent()).thenReturn(null);

        // Verificar que el contenido sea null
        assertNull(mockNote.getContent());

        // Verificar que el método getContent fue llamado una vez
        verify(mockNote, times(2)).getContent();
    }

    @Test
    void testIsValidContentWithMockito() {
        // Caso 1: Contenido válido
        when(note.isValidContent()).thenReturn(true);  // Simulamos que isValidContent() devuelve true
        note.setContent("Contenido válido.");
        assertTrue(note.isValidContent());  // Verificamos que la respuesta sea true

        // Caso 2: Contenido demasiado corto
        when(note.isValidContent()).thenReturn(false);  // Simulamos que isValidContent() devuelve false
        note.setContent("Corto");
        assertFalse(note.isValidContent());  // Verificamos que la respuesta sea false

        // Caso 3: Contenido vacío
        when(note.isValidContent()).thenReturn(false);  // Simulamos que isValidContent() devuelve false
        note.setContent("");
        assertFalse(note.isValidContent());  // Verificamos que la respuesta sea false

        // Caso 4: Contenido nulo
        when(note.isValidContent()).thenReturn(false);  // Simulamos que isValidContent() devuelve false
        note.setContent(null);
        assertFalse(note.isValidContent());  // Verificamos que la respuesta sea false
    }


    @Test
    void testConstructor() {
        // Verificar que el constructor inicializa correctamente los valores
        assertNotNull(note.getId());
        assertEquals("Nota inicial", note.getTitle());
        assertEquals("Este es el contenido inicial de la nota", note.getContent());
        assertEquals("Autor inicial", note.getAuthor());
        assertNotNull(note.getCreatedAt());
        assertNotNull(note.getUpdatedAt());
    }



    @Test
    void testGetTitleWithMockito() {
        // Crear un mock de la clase Note
        Note mockNote = mock(Note.class);

        // Configurar el comportamiento del mock para devolver un valor específico cuando se llama a getTitle()
        when(mockNote.getTitle()).thenReturn("Mock Title");

        // Verificar que el título sea el esperado
        assertEquals("Mock Title", mockNote.getTitle());

        // Verificar que el método getTitle() fue llamado exactamente una vez
        verify(mockNote, times(1)).getTitle();
    }
    @Test //contenido
    void testIsValidContent() {
        // Verificar validación de contenido
        note.setContent("Contenido válido.");
        assertTrue(note.isValidContent());
        note.setContent("Corto"); // Contenido demasiado corto
        assertFalse(note.isValidContent());
        note.setContent(""); // Contenido vacío
        assertFalse(note.isValidContent());
        note.setContent(null); // Contenido nulo
        assertFalse(note.isValidContent());
    }

    @Test
    void testIsValidAuthor() {
        // Verificar validación de autor
        note.setAuthor("AA");
        assertTrue(note.isValidAuthor());
        note.setAuthor("A"); // Autor demasiado corto
        assertFalse(note.isValidAuthor());
        note.setAuthor(""); // Autor vacío
        assertFalse(note.isValidAuthor());
        note.setAuthor(null); // Autor nulo
        assertFalse(note.isValidAuthor());
    }

    @Test
    void testIsValidNote() {
        // Verificar validación completa de la nota
        assertTrue(note.isValidNote());

        note.setTitle("No");
        assertFalse(note.isValidNote());

        note.setTitle("Título válido");
        note.setContent("Corto");
        assertFalse(note.isValidNote());

        note.setContent("Contenido válido.");
        note.setAuthor("A");
        assertFalse(note.isValidNote());
    }
}
