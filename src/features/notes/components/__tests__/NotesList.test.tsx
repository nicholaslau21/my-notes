import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../testing/test-utils";
import NotesList from "../NotesList";
import userEvent from "@testing-library/user-event";

it("should render the list of saved notes", () => {
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
            title: "Spiderman",
            description: "Maybe we need to watch this soon",
            folderId: "f1",
        },
    ];

    renderWithProviders(<NotesList notes={notes} />, ["/f1"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    expect(screen.getByText("Joker")).toBeVisible();
    expect(screen.getByText("Spiderman")).toBeVisible();
});

it("should render no notes found, when there are no notes", () => {
    renderWithProviders(<NotesList notes={[]} />);
    expect(screen.getByText("You don't have any notes")).toBeVisible();
});

it("should show the note details, when it is clicked", async () => {
    const user = userEvent.setup();

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

    renderWithProviders(<NotesList notes={notes} />, ["/f1"], 0, {
        preloadedState: {
            folders: { folders: initialFolders },
            notes: { notes: notes },
        },
    });

    const noteLink = screen.getByRole("link", { name: "Joker" });
    await user.click(noteLink);
    expect(screen.queryByRole("heading", { name: "Joker" })).toBeVisible();
    expect(screen.getByText("We need to watch this soon!")).toBeVisible();
});
