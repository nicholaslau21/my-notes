import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import NotesList from "../../../../features/notes/components/NotesList";
import { selectNotesByFolder } from "../../../../stores/note";
import { RootState } from "../../../../stores";
import { useFolder } from "../NotesLayout";

export default function NotesPage() {
    const [folderId, folders] = useFolder();
    const notes = useSelector((state: RootState) =>
        selectNotesByFolder(state, folderId)
    );

    const folder = folders.find((folder) => folderId === folder.folderId);

    return (
        <>
            <div className="flex flex-col flex-1">
                <h1 className="font-bold text-xl sm:text-3xl">
                    {folder?.name || "Notes"}
                </h1>
                <div className="flex justify-end">
                    <Link
                        to="add"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded text-sm sm:text-base"
                    >
                        New Note
                    </Link>
                </div>

                <NotesList notes={notes} />
            </div>
        </>
    );
}
