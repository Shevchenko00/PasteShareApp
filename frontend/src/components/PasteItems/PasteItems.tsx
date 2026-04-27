import { useNavigate } from "react-router-dom";
import styles from './PasteItems.module.scss';

const PasteItems = ({ pastes }) => {
    const navigate = useNavigate();

    return (
        <div className={styles.list}>
            {pastes.map((paste) => (
                <div
                    key={paste.id}
                    className={`${styles.card} ${
                        paste.is_expired ? styles.expired : ''
                    }`}
                >
                    <h3 className={styles.title}>{paste.title}</h3>
                    <p className={styles.text}>{paste.text}</p>

                    <div className={styles.footer}>
                        <div className={styles.left}>
                            <span
                                className={`${styles.badge} ${
                                    paste.is_expired
                                        ? styles.badgeExpired
                                        : styles.badgeActive
                                }`}
                            >
                                {paste.is_expired ? 'Expired' : 'Active'}
                            </span>

                            <span className={styles.date}>
                                expires at {new Date(paste.expires_at).toLocaleString()}
                            </span>
                        </div>

                        {/* ✨ MINIMAL EDIT BUTTON */}
                        <button
                            className={styles.editBtn}
                            onClick={() => navigate(`/paste/${paste.id}/edit`)}
                        >
                            edit
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default PasteItems;