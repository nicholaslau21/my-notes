import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../../testing/test-utils";
import NotesPage from "../Notes";
import {
    createFolders,
    createNotes,
} from "../../../../../testing/data-generators";

it("should show the notes by folder", () => {
    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<NotesPage />, ["/f1"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    expect(screen.getByText("Joker")).toBeVisible();
    expect(screen.queryByText("Dexter")).toBeNull();
});

it("should show the selected folder name", () => {
    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<NotesPage />, ["/f1"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    expect(screen.getByRole("heading", { name: "Movies" })).toBeVisible();
});

it("should show the new note button", () => {
    renderWithProviders(<NotesPage />);
    expect(screen.getByRole("link", { name: "New Note" })).toBeVisible();
});
