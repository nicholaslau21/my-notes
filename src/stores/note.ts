import { createSelector, createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from ".";
import { fetchFromLocalStorage, storeInLocalStorage } from "../utils/helper";
import { Note } from "../types/api";

type NoteState = {
    notes: Note[];
};

const initialState: NoteState = {
    notes: fetchFromLocalStorage("notes"),
};

const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {
        addNote(state, action) {
            const { title, description, folderId } = action.payload;

            const newNote = {
                id: uuidv4(),
                title,
                description,
                folderId,
            };
            state.notes.push(newNote);
            storeInLocalStorage("notes", state.notes);
        },
        updateNote(state, action) {
            const { id, data } = action.payload;

            const updatedNotes: Note[] = state.notes.map((note) => {
                if (note.id === id) {
                    return {
                        ...note,
                        ...data,
                    };
                }

                return note;
            });

            state.notes = updatedNotes;
            storeInLocalStorage("notes", state.notes);
        },
        deleteNote(state, action) {
            const id = action.payload;
            const updatedNotes = state.notes.filter((note) => note.id !== id);
            state.notes = updatedNotes;
            storeInLocalStorage("notes", updatedNotes);
        },
    },
});

const selectNotes = (state: RootState) => state.notes.notes;

export const selectNotesByFolder = createSelector(
    [
        selectNotes,
        (_rootState: RootState, folderId: string | undefined) => folderId,
    ],
    (notes, folderId) => {
        return notes.filter((note) => note.folderId === folderId);
    }
);

export const noteActions = noteSlice.actions;
export default noteSlice.reducer;
