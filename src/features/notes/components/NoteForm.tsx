import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { Folder, NoteData } from "../../../types/api";

type NoteFormProps = {
    onSubmit: (data: NoteData) => void;
    folders: Folder[];
} & Partial<NoteData>;

export default function NoteForm({
    onSubmit,
    folders,
    title = "",
    description = "",
    folderId = "",
}: NoteFormProps) {
    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const fd = new FormData(event.currentTarget);
        const data = Object.fromEntries(fd.entries());

        onSubmit({
            title: data.title as string,
            description: data.description as string,
            folderId: data.folder as string,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-4 sm:grid-cols-6">
                <div className="sm:col-span-3">
                    <label
                        htmlFor="title"
                        className="block font-medium text-gray-900"
                    >
                        Title
                    </label>
                    <div className="mt-2">
                        <input
                            id="title"
                            name="title"
                            type="text"
                            autoComplete="title"
                            defaultValue={title}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm/6"
                            required
                        />
                    </div>
                </div>

                <div className="col-span-full">
                    <label
                        htmlFor="description"
                        className="block font-medium text-gray-900"
                    >
                        Description
                    </label>
                    <div className="mt-2">
                        <textarea
                            id="description"
                            name="description"
                            rows={10}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm/6"
                            defaultValue={description}
                            required
                        />
                    </div>
                </div>

                <div className="sm:col-span-2">
                    <label
                        htmlFor="folder"
                        className="block font-medium text-gray-900"
                    >
                        Folder
                    </label>
                    <div className="mt-2">
                        <select
                            id="folder"
                            name="folder"
                            defaultValue={folderId}
                            autoComplete="folder-name"
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-black-600 sm:text-sm/6"
                        >
                            <option value="notes">Notes</option>
                            {folders.map((folder) => (
                                <option
                                    key={folder.folderId}
                                    value={folder.folderId}
                                >
                                    {folder.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end gap-x-2">
                <Link
                    to=".."
                    className="hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                >
                    Save
                </button>
            </div>
        </form>
    );
}
