import { useParams } from "react-router-dom";
import {useGetOnePasteQuery} from "@/services/pasteApi.ts";
import styles from "./ReadPage.module.scss";
import Header from "@/components/Header/Header.tsx";

const ReadPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: paste, isLoading } = useGetOnePasteQuery(id!, {
        skip: !id,
    });

    if (isLoading) return <div>Loading...</div>;
    if (!paste) return <div>Paste not found</div>;

    return (
        <>
        <Header/>
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>{paste.title}</h1>

                    <span className={styles.meta}>
                        Owner: {paste.owner}
                    </span>
                </div>

                <pre className={styles.codeBlock}>
                    <code>{paste.text}</code>
                </pre>
            </div>
        </div>
        </>
    );
};

export default ReadPage;