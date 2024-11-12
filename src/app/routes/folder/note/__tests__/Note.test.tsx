import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../../testing/test-utils";
import NotePage from "../Note";
import userEvent from "@testing-library/user-event";
import {
    createFolders,
    createNotes,
} from "../../../../../testing/data-generators";

it("should show the note title, description, and buttons", () => {
    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<NotePage />, ["/f1/n1"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    expect(screen.getByRole("heading", { name: "Joker" })).toBeVisible();
    expect(screen.getByText("We need to watch this soon!")).toBeVisible();

    const editBtn = screen.getByRole("link", { name: "Edit" });
    expect(editBtn).toBeVisible();
    expect(editBtn).toBeEnabled();

    const deleteBtn = screen.getByRole("button", { name: "Delete" });
    expect(deleteBtn).toBeVisible();
    expect(deleteBtn).toBeEnabled();

    const backBtn = screen.getByRole("link", { name: "Back" });
    expect(backBtn).toBeVisible();
});

it("should go back to notes list page, when the back button is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<NotePage />, ["/f1/n1"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    await user.click(screen.getByRole("link", { name: "Back" }));
    expect(screen.getByRole("link", { name: "New Note" })).toBeVisible();
});

it("should delete the note, when the delete button is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<NotePage />, ["/f1/n1"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    await user.click(screen.getByRole("button", { name: "Delete" }));
    expect(screen.getByRole("link", { name: "New Note" })).toBeVisible();
    expect(screen.queryByText("Joker")).toBeNull();
});

it("should go to the edit page, when the edit button is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<NotePage />, ["/f1", "/f1/n1"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    await user.click(screen.getByRole("link", { name: "Edit" }));

    expect(screen.queryByRole("heading", { name: "Edit Note" })).toBeVisible();
});
