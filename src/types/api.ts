export type Folder = {
    folderId: string;
} & FolderData;

export type FolderData = {
    name: string;
};

export type Note = {
    id: string;
} & NoteData;

export type NoteData = {
    title: string;
    description: string;
    folderId: string;
};
