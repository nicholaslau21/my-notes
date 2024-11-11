import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NoteForm from "../../../../features/notes/components/NoteForm";
import { selectAllFolders } from "../../../../stores/folder";
import { noteActions } from "../../../../stores/note";
import { NoteData } from "../../../../types/api";
import { useNote } from "./NoteLayout";

export default function EditNotePage() {
    const folders = useSelector(selectAllFolders);
    const note = useNote();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    function handleUpdateNote(id: string, data: NoteData) {
        if (note.folderId === data.folderId) {
            navigate(-1);
        } else {
            navigate(-2);
        }
        dispatch(noteActions.updateNote({ id, data }));
    }

    return (
        <>
            <div className="flex flex-col flex-1">
                <h1 className="text-xl sm:text-3xl font-bold ">Edit Note</h1>
                <NoteForm
                    title={note.title}
                    description={note.description}
                    folderId={note.folderId}
                    onSubmit={(data: NoteData) =>
                        handleUpdateNote(note.id, data)
                    }
                    folders={folders}
                />
            </div>
        </>
    );
}
