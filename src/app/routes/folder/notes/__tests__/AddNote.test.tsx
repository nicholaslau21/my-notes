import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../../../testing/test-utils";
import NotesPage from "../Notes";
import {
    createFolders,
    createNotes,
} from "../../../../../testing/data-generators";

it("should show the new note title", () => {
    const initialFolders = createFolders();

    renderWithProviders(<NotesPage />, ["/", "/notes/add"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
        },
    });

    expect(screen.getByRole("heading", { name: "New Note" })).toBeVisible();
});

it("should show the form fields", () => {
    renderWithProviders(<NotesPage />, ["/", "/notes/add"]);
    expect(screen.getByRole("textbox", { name: "Title" })).toBeVisible();
    expect(screen.getByRole("textbox", { name: "Description" })).toBeVisible();
    expect(screen.getByRole("combobox", { name: "Folder" })).toBeVisible();

    const saveBtn = screen.getByRole("button", { name: "Save" });
    expect(saveBtn).toBeVisible();
    expect(saveBtn).toBeEnabled();

    const cancelBtn = screen.getByRole("link", { name: "Cancel" });
    expect(cancelBtn).toBeVisible();
});

it("should show the folder dropdown with the saved folders options", () => {
    const initialFolders = createFolders();
    renderWithProviders(<NotesPage />, ["/", "/notes/add"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
        },
    });
    expect(screen.getAllByRole("option").length).toBe(3);
});

it("should go back to the notes list, when the cancel button is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    renderWithProviders(<NotesPage />, ["/", "/notes/add"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
        },
    });

    const cancelBtn = screen.getByRole("link", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(screen.getByRole("heading", { name: "Notes" })).toBeVisible();
});

it("should save the new note, when save button is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();

    const notes = createNotes();

    renderWithProviders(<NotesPage />, ["/", "/f1/add"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    const titleInput = screen.getByRole("textbox", { name: "Title" });
    await user.type(titleInput, "Interstellar");

    const descInput = screen.getByRole("textbox", { name: "Description" });
    await user.type(descInput, "Need to purchase the ticket for this");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    await user.click(saveBtn);

    expect(screen.getByText("Joker")).toBeVisible();
    expect(screen.getByText("Interstellar")).toBeVisible();
});
