import ReactMarkdown from "react-markdown";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { noteActions } from "../../../../stores/note";
import { useNote } from "./NoteLayout";

export default function NotePage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const note = useNote();

    function handleDeleteNote(id: string) {
        dispatch(noteActions.deleteNote(id));
        navigate(-1);
    }

    return (
        <>
            <div className="flex flex-col flex-1">
                <h1 className="text-4xl font-extrabold">{note.title}</h1>
                <ReactMarkdown
                    className="prose mt-10"
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                >
                    {note.description}
                </ReactMarkdown>
                <div className="mt-16 flex justify-end gap-x-2">
                    <Link
                        to=".."
                        className="hover:bg-zinc-200 text-black font-semibold py-2 px-4 rounded"
                    >
                        Back
                    </Link>
                    <button
                        type="button"
                        className="bg-transparent hover:bg-red-700 text-black font-semibold border-red-500 hover:text-white  hover:border-transparent py-2 px-4 rounded"
                        onClick={() => handleDeleteNote(note.id)}
                    >
                        Delete
                    </button>
                    <Link
                        to="edit"
                        className="bg-indigo-500 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
                    >
                        Edit
                    </Link>
                </div>
            </div>
        </>
    );
}
