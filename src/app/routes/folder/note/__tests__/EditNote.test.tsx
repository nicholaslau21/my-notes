import userEvent from "@testing-library/user-event";
import { renderWithProviders } from "../../../../../testing/test-utils";
import EditNotePage from "../EditNote";
import { screen } from "@testing-library/react";
import {
    createFolders,
    createNotes,
} from "../../../../../testing/data-generators";

it("should populate the note details", () => {
    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<EditNotePage />, ["/f1", "/f1/n1/edit"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    expect(screen.getByDisplayValue("Joker")).toBeVisible();
    expect(
        screen.getByDisplayValue("We need to watch this soon!")
    ).toBeVisible();
    expect(screen.getByDisplayValue("Movies")).toBeVisible();

    const saveBtn = screen.getByRole("button", { name: "Save" });
    expect(saveBtn).toBeVisible();
    expect(saveBtn).toBeEnabled();

    const cancelBtn = screen.getByRole("link", { name: "Cancel" });
    expect(cancelBtn).toBeVisible();
});

it("should go back to note page, when the cancel button is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<EditNotePage />, ["/f1", "/f1/n1/edit"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    const cancelBtn = screen.getByRole("link", { name: "Cancel" });
    await user.click(cancelBtn);

    expect(screen.getByRole("heading", { name: "Joker" })).toBeVisible();
});

it("should save the updated note, when the save button is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<EditNotePage />, ["/f1/n1", "/f1/n1/edit"], 1, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    const titleInput = screen.getByRole("textbox", { name: "Title" });
    await user.clear(titleInput);
    await user.type(titleInput, "JokerNew");

    const descInput = screen.getByRole("textbox", { name: "Description" });
    await user.clear(descInput);
    await user.type(descInput, "Ticket has been bought!");

    const saveBtn = screen.getByRole("button", { name: "Save" });
    await user.click(saveBtn);

    expect(screen.queryByRole("heading", { name: "Joker" })).toBeNull();
    expect(screen.queryByText("We need to watch this soon!")).toBeNull();

    expect(screen.getByRole("heading", { name: "JokerNew" })).toBeVisible();
    expect(screen.getByText("Ticket has been bought!")).toBeVisible();
});

it("should navigate back to the note page, when the the note is updated and folder is unchanged", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<EditNotePage />, ["/f1", "/f1/n1", "/f1/n1/edit"], 2, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    const folderSelect = screen.getByRole("combobox", { name: "Folder" });
    await user.selectOptions(folderSelect, ["Movies"]);

    const saveBtn = screen.getByRole("button", { name: "Save" });
    await user.click(saveBtn);

    expect(screen.getByRole("heading", { name: "Joker" })).toBeVisible();
    expect(screen.getByText("We need to watch this soon!")).toBeVisible();
    expect(screen.queryByText("You don't have any notes")).toBeNull();
});

it("should navigate back to the notes list page, when the note is updated and folder is changed", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<EditNotePage />, ["/f1", "/f1/n1", "/f1/n1/edit"], 2, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    const folderSelect = screen.getByRole("combobox", { name: "Folder" });
    await user.selectOptions(folderSelect, ["TV Shows"]);

    const saveBtn = screen.getByRole("button", { name: "Save" });
    await user.click(saveBtn);

    expect(screen.queryByRole("heading", { name: "Joker" })).toBeNull();
    expect(screen.queryByText("We need to watch this soon!")).toBeNull();
    expect(screen.getByText("You don't have any notes")).toBeVisible();
});
