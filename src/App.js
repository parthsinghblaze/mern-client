import React from 'react'
import Home from "./pages/Home";
import Header from "./components/Home/Header";
import {Routes, Route} from "react-router-dom";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";

function App() {
    return (
        <>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/edit-post/:id" element={<EditPost />} />
    </Routes>
        </>
    )
}

export default App