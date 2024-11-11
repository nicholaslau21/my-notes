import { FormEvent, useState } from "react";
import { FolderData } from "../../../types/api";

type FolderFormProps = {
    onSubmit: (data: FolderData) => void;
    showModal: boolean;
    onClose: () => void;
} & Partial<FolderData>;

const FolderForm = function FolderForm({
    onSubmit,
    onClose,
    name = "",
}: FolderFormProps) {
    const [folderName, setFolderName] = useState(name);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const fd = new FormData(event.currentTarget);

        onSubmit({ name: fd.get("name") as string });
        onClose();
    }

    return (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 w-4/12 xl:max-w-md">
                    <form onSubmit={handleSubmit}>
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                            <header>
                                <h1 className="p-4 font-bold">New Folder</h1>
                            </header>
                            <hr />
                            <article className="p-6">
                                <label
                                    htmlFor="name"
                                    className="block font-medium text-gray-900"
                                >
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="name"
                                        name="name"
                                        type="text"
                                        value={folderName}
                                        onChange={(event) =>
                                            setFolderName(event.target.value)
                                        }
                                        autoComplete="name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black-600"
                                        required
                                    />
                                </div>
                            </article>

                            <hr className="mt-4" />
                            <footer className="flex justify-end p-4 gap-x-2">
                                <button
                                    type="button"
                                    className="hover:bg-zinc-200 text-black font-bold py-2 px-4 rounded"
                                    onClick={() => onClose()}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
                                >
                                    Save
                                </button>
                            </footer>
                        </div>
                    </form>
                </div>
            </div>
            <div className="opacity-40 fixed inset-0 z-40 bg-black" />
        </>
    );
};

export default FolderForm;
