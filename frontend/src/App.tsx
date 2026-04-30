import styles from "./App.module.scss";

import {Routes, Route} from "react-router-dom";

import CreatePage from "@/pages/CreatePage/CreatePage.tsx";
import RootPage from "@/pages/RootPage/RootPage.tsx";
import UpdatePage from "@/pages/UpdatePage/UpdatePage.tsx";
import LoginPage from "@/pages/LoginPage/LoginPage.tsx";

import {ProtectedRoute} from "@/pages/ProtectedRoute/ProtectedRoute.tsx";
import RegisterPage from "@/pages/RegisterPage/RegisterPage.tsx";
import ReadPage from "@/pages/GetPage/ReadPage.tsx";

function App() {
    return (
        <div className={styles.page}>
            <main className={styles.content}>
                <Routes>
                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>

                    <Route
                        path="/"
                        element={
                            <ProtectedRoute>
                                <RootPage/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/create"
                        element={
                            <ProtectedRoute>
                                <CreatePage/>
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/paste/:id/get"
                        element={
                            <ProtectedRoute>
                                <ReadPage/>
                            </ProtectedRoute>
                        }
                    />



                    <Route
                        path="/paste/:id/edit"
                        element={
                            <ProtectedRoute>
                                <UpdatePage/>
                            </ProtectedRoute>
                        }
                    />
                </Routes>
            </main>
        </div>
    );
}

export default App;