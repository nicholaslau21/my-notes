export const createFolders = () => {
    return [
        { folderId: "f1", name: "Movies" },
        { folderId: "f2", name: "TV Shows" },
    ];
};

export const createNotes = () => {
    return [
        {
            id: "n1",
            title: "Joker",
            description: "We need to watch this soon!",
            folderId: "f1",
        },
        {
            id: "n2",
            title: "Dexter",
            description: "Maybe we need to watch this soon",
            folderId: "f2",
        },
    ];
};
