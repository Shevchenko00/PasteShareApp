import styles from './PlusButton.module.scss';
import { useState } from "react";
import {
    useCreateFolderMutation,
    useGetFolderQuery
} from "@/services/createApi.ts";

const PlusButton = () => {
    const [open, setOpen] = useState(false);

    const [createFolder] = useCreateFolderMutation();

    const { data: folders, isLoading } = useGetFolderQuery();

    const handleCreate = async () => {
        await createFolder({ folder_name: "Test" }).unwrap();
    };

    return (
        <div className={styles.wrapper}>
            {open && (
                <div className={styles.menu}>
                    <button
                        onClick={handleCreate}
                        className={styles.item}
                    >
                        Create Folder
                    </button>

                    <button className={styles.item}>
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