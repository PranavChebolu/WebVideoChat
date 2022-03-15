import React from "react";
import {BrowserRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import VideoChat from "./component/VideoChat";
import Home from "./component/Home";

export const k_home_route = "/home";
export const k_video_chat_route = "/video_chat";

const App = () => {
    const [name, setName] = React.useState("");

    return (
        <Router>
            {/* A <Router> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
            <Routes>
                <Route path={k_home_route} element={<Home setName={setName}/>}/>
                <Route path={k_video_chat_route} element={<VideoChat name={name}/>}/>
                <Route path="*" element={<Navigate to={k_home_route}/>}/>
            </Routes>
        </Router>
    );
}

export default App;
