import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteForm from "../../../../features/notes/components/NoteForm";
import { noteActions } from "../../../../stores/note";
import { NoteData } from "../../../../types/api";
import { useFolder } from "../NotesLayout";

export default function AddNotePage() {
    const [folderId, folders] = useFolder();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleAddNote(data: NoteData) {
        dispatch(noteActions.addNote(data));
        navigate("..");
    }

    return (
        <>
            <div className="flex flex-col flex-1">
                <h1 className="text-3xl font-bold text-xl sm:text-3xl">
                    New Note
                </h1>
                <NoteForm
                    onSubmit={handleAddNote}
                    folders={folders}
                    folderId={folderId}
                />
            </div>
        </>
    );
}
