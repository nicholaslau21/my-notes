import { Link } from "react-router-dom";
import NoNotesFound from "./NoNotesFound";
import { Note } from "../../../types/api";

type NotesListProps = {
    notes: Note[];
};

export default function NotesList({ notes }: NotesListProps) {
    if (!notes.length) {
        return <NoNotesFound />;
    }

    return (
        <>
            <div className="mt-8 flex flex-col overflow-auto">
                {notes.map((note) => (
                    <Link
                        key={note.id}
                        to={note.id}
                        className="my-2 p-4 sm:p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100"
                    >
                        <h5 className="text-md font-bold sm:text-2xl">
                            {note.title}
                        </h5>
                    </Link>
                ))}
            </div>
        </>
    );
}
