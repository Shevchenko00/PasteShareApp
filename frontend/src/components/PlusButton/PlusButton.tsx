import styles from './PlusButton.module.scss';
import { useState } from "react";
import {
    useCreateFileMutation,
    useCreateFolderMutation, useGetFileQuery,
    useGetFolderQuery
} from "@/services/createApi.ts";

const PlusButton = () => {
    const [open, setOpen] = useState(false);

    const [createFolder] = useCreateFolderMutation();
    const [createFile] = useCreateFileMutation();
    // const {
    //     data: folders,
    //     isLoading: isFoldersLoading,
    //     isError: isFoldersError
    // } = useGetFolderQuery();
    //
    // const {
    //     data: files,
    //     isLoading: isFilesLoading,
    //     isError: isFilesError
    // } = useGetFileQuery();
    const handleFolderCreate = async () => {
        await createFolder({ folder_name: "Test" }).unwrap();
    };
    const handlFileCreate = async () => {
        await createFile({ file_name: "Test" }).unwrap();
    };
    return (
        <div className={styles.wrapper}>
            {open && (
                <div className={styles.menu}>
                    <button
                        onClick={handleFolderCreate}
                        className={styles.item}
                    >
                        Create Folder
                    </button>

                    <button
                        onClick={handlFileCreate}
                        className={styles.item}>
                        Create File
                    </button>
                </div>
            )}

            <button
                className={styles.plus_button}
                onClick={() => setOpen(!open)}
            >
                <span className={`${styles.icon} ${open ? styles.rotated : ""}`}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19" stroke="white" strokeWidth="2"/>
                        <line x1="5" y1="12" x2="19" y2="12" stroke="white" strokeWidth="2"/>
                    </svg>
                </span>
            </button>
        </div>
    );
};

export default PlusButton;