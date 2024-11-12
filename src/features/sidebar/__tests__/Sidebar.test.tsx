import { screen } from "@testing-library/react";
import Sidebar from "../components/Sidebar";
import { renderWithProviders } from "../../../testing/test-utils";
import userEvent from "@testing-library/user-event";
import { createFolders, createNotes } from "../../../testing/data-generators";

it("should display the sidebar header", () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByRole("link", { name: "MyNotes" })).toBeVisible();
});

it("should show the new folder button", () => {
    renderWithProviders(<Sidebar />);
    const newFolderBtn = screen.getByRole("button", {
        name: "New Folder",
    });
    expect(newFolderBtn).toBeVisible();
    expect(newFolderBtn).toBeEnabled();
});

it("should show the default folder of notes", () => {
    renderWithProviders(<Sidebar />);
    expect(screen.getByRole("link", { name: "Notes" })).toBeVisible();
});

it("should show the other saved folders", async () => {
    const initialFolders = [
        { folderId: "f1", name: "Movies" },
        { folderId: "f2", name: "TV Shows" },
    ];

    renderWithProviders(<Sidebar />, ["/"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
        },
    });

    expect(screen.getByText("Movies")).toBeVisible();
    expect(screen.getByText("TV Shows")).toBeVisible();
});

it("should show the notes by folder, when it is clicked", async () => {
    const user = userEvent.setup();

    const initialFolders = createFolders();
    const notes = createNotes();

    renderWithProviders(<Sidebar />, ["/"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    await user.click(screen.getByRole("link", { name: "TV Shows" }));

    expect(screen.getByText("Dexter")).toBeVisible();
    expect(screen.queryByText("Joker")).toBeNull();
});

it("should open the new folder modal, when the new folder button is clicked", async () => {
    const user = userEvent.setup();
    renderWithProviders(<Sidebar />);

    await user.click(screen.getByRole("button", { name: "New Folder" }));

    expect(screen.queryByRole("heading", { name: "New Folder" })).toBeVisible();

    const input = screen.getByRole("textbox", { name: "Name" });
    expect(input).toBeVisible();

    const saveBtn = screen.getByRole("button", { name: "Save" });
    expect(saveBtn).toBeVisible();
    expect(saveBtn).toBeEnabled();

    const cancelBtn = screen.getByRole("button", { name: "Cancel" });
    expect(cancelBtn).toBeVisible();
});
