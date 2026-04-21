import styles from './PlusButton.module.scss';

import {useState} from "react";

const PlusButton = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={styles.wrapper}>
            {open && (
                <div className={styles.menu}>
                    <button className={styles.item}>Action 1</button>
                    <button className={styles.item}>Action 2</button>
                    <button className={styles.item}>Action 3</button>
                </div>
            )}

            <button
                className={styles.plus_button}
                onClick={() => setOpen(!open)}
            >
                <span className={`${styles.icon} ${open ? styles.rotated : ""}`}>
                    +
                </span>
            </button>
        </div>
    );
};

export default PlusButton;