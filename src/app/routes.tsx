import { Navigate } from "react-router-dom";
import RootLayout, { RootErrorBoundary } from "./routes/Root.tsx";
import NotesLayoutPage from "./routes/folder/NotesLayout.tsx";
import EditNotePage from "./routes/folder/note/EditNote.tsx";
import NotePage from "./routes/folder/note/Note.tsx";
import NoteLayoutPage from "./routes/folder/note/NoteLayout.tsx";
import AddNotePage from "./routes/folder/notes/AddNote.tsx";
import NotesPage from "./routes/folder/notes/Notes.tsx";

const routesConfig = [
    {
        path: "/",
        element: <RootLayout />,
        ErrorBoundary: RootErrorBoundary,
        children: [
            {
                index: true,
                element: <Navigate to={"/notes"} replace />,
            },
            {
                path: ":folderId",
                element: <NotesLayoutPage />,
                children: [
                    {
                        index: true,
                        element: <NotesPage />,
                    },
                    {
                        path: ":id",
                        element: <NoteLayoutPage />,
                        children: [
                            {
                                index: true,
                                element: <NotePage />,
                            },
                            {
                                path: "edit",
                                element: <EditNotePage />,
                            },
                        ],
                    },
                    {
                        path: "add",
                        element: <AddNotePage />,
                    },
                ],
            },
        ],
    },
];

export default routesConfig;
