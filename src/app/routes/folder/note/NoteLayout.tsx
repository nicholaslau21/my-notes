import { useSelector } from "react-redux";
import {
    Navigate,
    Outlet,
    useOutletContext,
    useParams,
} from "react-router-dom";
import { selectNotesByFolder } from "../../../../stores/note";
import { Note } from "../../../../types/api";
import { RootState } from "../../../../stores";

export default function NoteLayoutPage() {
    const { folderId, id } = useParams();
    const notes = useSelector((state: RootState) =>
        selectNotesByFolder(state, folderId)
    );

    const note = notes.find((note) => note.id === id);

    if (!note) return <Navigate to="/" replace />;

    return <Outlet context={note} />;
}

export function useNote() {
    return useOutletContext<Note>();
}
