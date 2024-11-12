import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../../../testing/test-utils";
import NotesList from "../NotesList";
import userEvent from "@testing-library/user-event";
import {
    createFolders,
    createNotes,
} from "../../../../testing/data-generators";

it("should render the list of saved notes", () => {
    const initialFolders = createFolders();

    const notes = [
        ...createNotes(),
        {
            id: "n3",
            title: "Spiderman",
            description: "Watch this!",
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

    const initialFolders = createFolders();
    const notes = createNotes();

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
