import { useSelector } from "react-redux";
import { Outlet, useOutletContext, useParams } from "react-router-dom";
import { selectAllFolders } from "../../../stores/folder";
import { Folder } from "../../../types/api";

export default function NotesLayoutPage() {
    const { folderId } = useParams();
    const folders = useSelector(selectAllFolders);

    return (
        <>
            <div className="m-6 flex flex-1">
                <Outlet context={[folderId, folders]} />
            </div>
        </>
    );
}

export function useFolder() {
    return useOutletContext<[string, Folder[]]>();
}
