import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { store } from "@/app/store.ts";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // 👈 добавь

createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter> {/* 👈 вот это нужно */}
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)