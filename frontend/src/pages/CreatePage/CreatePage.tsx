import styles from './CreatePage.module.scss';
import {useState} from "react";
import {useCreatePasteMutation} from "@/services/pasteApi.ts";
import type {TimeToDelete} from "@/services/types.ts";

const CreatePage = () => {
    const [timeToDelete, setTimeToDelete] = useState<TimeToDelete>("1h");
    const [title, setTitle] = useState<string>('');
    const [text, setText] = useState<string>('');
    const [createPaste] = useCreatePasteMutation()

    const handlePasteCreate = async () => {
        await createPaste({ title, text, timeToDelete }).unwrap();
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <h1 className={styles.title}>Create New Paste</h1>

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
                        onChange={(e) => setTimeToDelete(e.target.value as TimeToDelete)}
                        className={styles.select}
                    >
                        <option value="5m">5 minutes</option>
                        <option value="1h">1 hour</option>
                        <option value="1d">1 day</option>
                    </select>
                </div>
                <div className={styles.actions}>
                    <button onClick={() => {
                        setText('');
                        setTitle('');
                    }} className={styles.buttonSecondary}>
                        Clear
                    </button>

                    <button disabled={!title.trim() || !text.trim()} onClick={ handlePasteCreate} className={styles.buttonPrimary}>
                        Create Paste
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CreatePage;