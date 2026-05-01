import { useAuth } from "@/hooks/useAuth";
import styles from "./Header.module.scss";

export default function Header({}) {
    const { logout } = useAuth();

    return (
        <header className={styles.header}>
            <div className={styles.left}>Paste Share App</div>

            <div className={styles.action}>
                <button
                    className={styles.logoutButton}
                    onClick={logout}
                >
                    Logout
                </button>
            </div>
        </header>
    );
}