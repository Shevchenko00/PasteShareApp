import styles from "./App.module.scss";

import { Routes, Route } from "react-router-dom";

import CreatePage from "@/pages/CreatePage/CreatePage.tsx";
import RootPage from "@/pages/RootPage/RootPage.tsx";
import UpdatePage from "@/pages/UpdatePage/UpdatePage.tsx";

function App() {
    return (
        <div className={styles.page}>
            <main className={styles.content}>
                <Routes>
                    <Route path="/" element={<RootPage />} />
                    <Route path="/create" element={<CreatePage />} />

                    <Route path="/paste/:id/edit" element={<UpdatePage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;