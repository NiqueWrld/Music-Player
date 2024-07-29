import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./components/Header";
import Main from "./components/Main";
import Aside from "./components/Aside";
import Search from "./components/Search";

import Home from "./pages/Home";
import Mymusic from "./pages/Mymusic";
import ChartList from "./pages/ChartList";
import PlayList from "./pages/PlayList";
import MusicPlayerProvider from "./context/MusicPlayerProvider";

const App = () => {
    const [isHeaderCollapsed, setIsHeaderCollapsed] = useState(false);
    const [isAsideCollapsed, setIsAsideCollapsed] = useState(false);

    const toggleHeader = () => {
        setIsHeaderCollapsed(!isHeaderCollapsed);
    };

    const toggleAside = () => {
        setIsAsideCollapsed(!isAsideCollapsed);
    };

    return (
        <MusicPlayerProvider>
            <BrowserRouter>
                <div className={`app ${isHeaderCollapsed ? 'header-collapsed' : ''} ${isAsideCollapsed ? 'aside-collapsed' : ''}`}>
                    <Header toggleHeader={toggleHeader} />
                    <Main>
                        <Search />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/mymusic" element={<Mymusic />} />
                            <Route path="/playlist/:id" element={<PlayList />} />
                            <Route path="/chart/:id" element={<ChartList />} />
                        </Routes>
                    </Main>
                    <Aside toggleAside={toggleAside} />
                </div>
            </BrowserRouter>
        </MusicPlayerProvider>
    );
};

export default App;
