import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { RootState } from ".";
import { Folder } from "../types/api";
import { fetchFromLocalStorage, storeInLocalStorage } from "../utils/helper";

type FolderState = {
    folders: Folder[];
};

const initialState: FolderState = {
    folders: fetchFromLocalStorage("folders"),
};

const folderSlice = createSlice({
    name: "folders",
    initialState,
    reducers: {
        addFolder(state, action) {
            const { name } = action.payload;

            const newFolder = {
                folderId: uuidv4(),
                name,
            };
            state.folders.push(newFolder);
            storeInLocalStorage("folders", state.folders);
        },
        updateFolder(state, action) {
            const { id, data } = action.payload;

            const updatedFolders: Folder[] = state.folders.map((folder) => {
                if (folder.folderId === id) {
                    return {
                        ...folder,
                        ...data,
                    };
                }

                return folder;
            });

            state.folders = updatedFolders;
            storeInLocalStorage("folders", state.folders);
        },
    },
});

export const selectAllFolders = (state: RootState) => state.folders.folders;

export const folderActions = folderSlice.actions;
export default folderSlice.reducer;
