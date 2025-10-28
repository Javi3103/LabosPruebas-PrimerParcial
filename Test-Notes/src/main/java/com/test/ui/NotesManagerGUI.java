package com.test.ui;

import com.test.model.Note;
import com.test.repository.NoteRepository;
import com.test.service.NoteService;

import javax.swing.*;
import javax.swing.table.DefaultTableModel;
import java.awt.*;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.util.Vector;

public class NotesManagerGUI extends JFrame {
    private NoteService noteService;
    private JTable notesTable;
    private DefaultTableModel tableModel;
    private JTextField titleField;
    private JTextField authorField;  // Nuevo campo de autor
    private JTextArea contentArea;

    public NotesManagerGUI() {
        NoteRepository noteRepository = new NoteRepository();
        noteService = new NoteService(noteRepository);

        setTitle("Gestor de Notas Avanzado");
        setSize(1000, 600);
        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setLocationRelativeTo(null);

        setLayout(new BorderLayout(10, 10));

        JPanel inputPanel = createInputPanel();
        add(inputPanel, BorderLayout.NORTH);

        // Actualizar columnas para incluir autor
        tableModel = new DefaultTableModel(
                new String[]{"ID", "Título", "Contenido", "Autor", "Creada"}, 0
        );
        notesTable = new JTable(tableModel);
        JScrollPane tableScrollPane = new JScrollPane(notesTable);
        add(tableScrollPane, BorderLayout.CENTER);

        JPanel buttonPanel = createButtonPanel();
        add(buttonPanel, BorderLayout.SOUTH);

        refreshNotesTable();
    }

    private JPanel createInputPanel() {
        JPanel panel = new JPanel(new BorderLayout());

        titleField = new JTextField(20);
        authorField = new JTextField(15);  // Nuevo campo de autor
        contentArea = new JTextArea(5, 20);
        contentArea.setLineWrap(true);
        contentArea.setWrapStyleWord(true);

        JPanel topPanel = new JPanel(new FlowLayout(FlowLayout.LEFT));
        topPanel.add(new JLabel("Título: "));
        topPanel.add(titleField);
        topPanel.add(new JLabel("Autor: "));
        topPanel.add(authorField);

        panel.add(topPanel, BorderLayout.NORTH);
        panel.add(new JScrollPane(contentArea), BorderLayout.CENTER);

        return panel;
    }

    private JPanel createButtonPanel() {
        JPanel panel = new JPanel(new FlowLayout());

        JButton addButton = new JButton("Agregar Nota");
        JButton deleteButton = new JButton("Eliminar Nota");
        JButton updateButton = new JButton("Actualizar Nota");
        JButton filterButton = new JButton("Filtrar por Autor");

        addButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String title = titleField.getText();
                String content = contentArea.getText();
                String author = authorField.getText();

                try {
                    Note note = noteService.createNote(title, content, author);
                    refreshNotesTable();
                    clearInputFields();
                } catch (IllegalArgumentException ex) {
                    JOptionPane.showMessageDialog(NotesManagerGUI.this,
                            ex.getMessage(),
                            "Error de Validación",
                            JOptionPane.ERROR_MESSAGE);
                }
            }
        });

        deleteButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int selectedRow = notesTable.getSelectedRow();
                if (selectedRow >= 0) {
                    String noteId = (String) tableModel.getValueAt(selectedRow, 0);
                    noteService.deleteNote(noteId);
                    refreshNotesTable();
                } else {
                    JOptionPane.showMessageDialog(NotesManagerGUI.this,
                            "Seleccione una nota para eliminar",
                            "Nota no Seleccionada",
                            JOptionPane.WARNING_MESSAGE);
                }
            }
        });

        updateButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                int selectedRow = notesTable.getSelectedRow();
                if (selectedRow >= 0) {
                    String noteId = (String) tableModel.getValueAt(selectedRow, 0);
                    String title = titleField.getText();
                    String content = contentArea.getText();
                    String author = authorField.getText();

                    try {
                        Note updatedNote = noteService.updateNote(noteId, title, content, author);
                        refreshNotesTable();
                        clearInputFields();
                    } catch (IllegalArgumentException ex) {
                        JOptionPane.showMessageDialog(NotesManagerGUI.this,
                                ex.getMessage(),
                                "Error de Validación",
                                JOptionPane.ERROR_MESSAGE);
                    }
                } else {
                    JOptionPane.showMessageDialog(NotesManagerGUI.this,
                            "Seleccione una nota para actualizar",
                            "Nota no Seleccionada",
                            JOptionPane.WARNING_MESSAGE);
                }
            }
        });

        filterButton.addActionListener(new ActionListener() {
            @Override
            public void actionPerformed(ActionEvent e) {
                String author = JOptionPane.showInputDialog(
                        NotesManagerGUI.this,
                        "Ingrese el autor a filtrar:"
                );
                if (author != null && !author.trim().isEmpty()) {
                    // Lógica de filtrado de notas por autor
                    filterNotesByAuthor(author);
                }
            }
        });

        panel.add(addButton);
        panel.add(deleteButton);
        panel.add(updateButton);
        panel.add(filterButton);

        return panel;
    }

    private void filterNotesByAuthor(String author) {
        // Limpiar tabla
        tableModel.setRowCount(0);

        // Cargar notas del autor especificado
        noteService.getNotesByAuthor(author).forEach(note -> {
            Vector<Object> row = new Vector<>();
            row.add(note.getId());
            row.add(note.getTitle());
            row.add(note.getContent());
            row.add(note.getAuthor());
            row.add(note.getCreatedAt());
            tableModel.addRow(row);
        });
    }

    private void refreshNotesTable() {
        // Limpiar tabla
        tableModel.setRowCount(0);

        // Cargar notas
        for (Note note : noteService.getAllNotes()) {
            Vector<Object> row = new Vector<>();
            row.add(note.getId());
            row.add(note.getTitle());
            row.add(note.getContent());
            row.add(note.getAuthor());
            row.add(note.getCreatedAt());
            tableModel.addRow(row);
        }
    }

    private void clearInputFields() {
        titleField.setText("");
        contentArea.setText("");
        authorField.setText("");
    }

    public static void main(String[] args) {
        SwingUtilities.invokeLater(new Runnable() {
            @Override
            public void run() {
                new NotesManagerGUI().setVisible(true);
            }
        });
    }
}
