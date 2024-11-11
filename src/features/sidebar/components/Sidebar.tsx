import { useState } from "react";
import { Link } from "react-router-dom";
import { Link as SidebarNavItem } from "../../../components/ui/link";
import { useAppDispatch, useAppSelector } from "../../../hooks/hooks";
import { folderActions, selectAllFolders } from "../../../stores/folder";
import { FolderData } from "../../../types/api";
import FolderForm from "../../folder/components/FolderForm";

export default function Sidebar() {
    const folders = useAppSelector(selectAllFolders);
    const dispatch = useAppDispatch();
    const [showModal, setShowModal] = useState(false);

    function handleAddFolder(data: FolderData) {
        dispatch(folderActions.addFolder(data));
    }

    return (
        <>
            <aside className="w-32 py-12 sm:w-56 sm:max-w-64 bg-zinc-100 border-r border-solid border-zinc-300 ">
                <h3 className="text-center mb-10 font-extrabold">
                    <Link to="/" className="text-sm sm:text-base">
                        MyNotes
                    </Link>
                </h3>
                <nav className="px-4 sm:px-12">
                    <ul>
                        <SidebarNavItem to="/notes">Notes</SidebarNavItem>
                        {folders.map((folder) => (
                            <SidebarNavItem
                                key={folder.folderId}
                                to={folder.folderId}
                            >
                                {folder.name}
                            </SidebarNavItem>
                        ))}
                        <li className="p-1 mt-2">
                            <button
                                onClick={() =>
                                    setShowModal((isOpen) => !isOpen)
                                }
                                className="text-sm sm:text-base bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                            >
                                New Folder
                            </button>
                        </li>
                    </ul>
                </nav>
            </aside>
            {showModal && (
                <FolderForm
                    onSubmit={handleAddFolder}
                    showModal={showModal}
                    onClose={() => setShowModal(false)}
                />
            )}
        </>
    );
}
