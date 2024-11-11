import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../../testing/test-utils";
import NotesPage from "../Notes";

it("should show the notes by folder", () => {
    const initialFolders = [
        { folderId: "f1", name: "Movies" },
        { folderId: "f2", name: "TV Shows" },
    ];

    const notes = [
        {
            id: "n1",
            title: "Joker",
            description: "We need to watch this soon!",
            folderId: "f1",
        },
        {
            id: "n2",
            title: "Dexter",
            description: "Maybe we need to watch this soon",
            folderId: "f2",
        },
    ];

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
    const initialFolders = [
        { folderId: "f1", name: "Movies" },
        { folderId: "f2", name: "TV Shows" },
    ];

    const notes = [
        {
            id: "n1",
            title: "Joker",
            description: "We need to watch this soon!",
            folderId: "f1",
        },
        {
            id: "n2",
            title: "Dexter",
            description: "Maybe we need to watch this soon",
            folderId: "f2",
        },
    ];

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
