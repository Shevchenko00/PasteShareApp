import {useEffect, useState} from "react";
import type {TimeToDelete} from "@/services/types.ts";
import {useUpdatePasteMutation, useGetPasteQuery} from "@/services/pasteApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import styles from "@/pages/CreatePage/CreatePage.module.scss";
import Header from "@/components/Header/Header.tsx";
import {useGetMeQuery} from "@/services/userApi.ts";

const UpdatePage = () => {
    const {id} = useParams<{ id: string }>();
    const navigate = useNavigate();

    const {data: pastes} = useGetPasteQuery();
    const [updatePaste] = useUpdatePasteMutation();
    const { data: getMe } = useGetMeQuery();
    const paste = pastes?.find(p => p.id === String(id));

    const [timeToDelete, setTimeToDelete] = useState<TimeToDelete>("1h");
    const [title, setTitle] = useState("");
    const [text, setText] = useState("");
    useEffect(() => {
        if (!getMe || !paste) return;

        if (getMe.email !== paste.owner) {
            navigate('/');
        }

        setTitle(paste.title);
        setText(paste.text);
        setTimeToDelete(paste.time_to_delete);

    }, [getMe, paste]);

    const handleUpdate = async () => {
        if (!id) return;

        await updatePaste({
            id,
            title,
            text,
            time_to_delete: timeToDelete,
        }).unwrap();

        navigate("/");
    };

    return (
        <>
            <Header/>

            <div className={styles.wrapper}>

                <div className={styles.container}>
                    <h1 className={styles.title}>Update paste</h1>

                    <input
                        className={styles.input}
                        onChange={(e) => setTitle(e.target.value)}
                        value={title}
                        placeholder="Paste title..."
                    />

                    <textarea
                        className={styles.textarea}
                        onChange={(e) => setText(e.target.value)}
                        value={text}
                        placeholder="Write your code or text here..."
                    />

                    <div className={styles.selectWrapper}>
                        <label className={styles.label}>Delete after</label>

                        <select
                            value={timeToDelete}
                            onChange={(e) =>
                                setTimeToDelete(e.target.value as TimeToDelete)
                            }
                            className={styles.select}
                        >
                            <option value="5m">5 minutes</option>
                            <option value="1h">1 hour</option>
                            <option value="1d">1 day</option>
                        </select>
                    </div>

                    <div className={styles.actions}>
                        <button
                            onClick={() => {
                                setText("");
                                setTitle("");
                            }}
                            className={styles.buttonSecondary}
                        >
                            Reset
                        </button>

                        <button
                            disabled={!title.trim() || !text.trim()}
                            onClick={handleUpdate}
                            className={styles.buttonPrimary}
                        >
                            Update Paste
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UpdatePage;