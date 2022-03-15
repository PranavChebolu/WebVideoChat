import React from "react";
import {useNavigate} from "react-router-dom";
import {k_video_chat_route} from "../../App";

const Home = (props) => {
    // function to navigate to new page
    const navigate = useNavigate();

    // keep track of name inputted by user
    const [name, setName] = React.useState("");

    const handleFormSubmit = (event) => {
        event.preventDefault();

        const validName = name.trim().length > 0;

        // check if user's name is valid
        if (validName) {
            const trimmedName = name.trim();
            props.setName(trimmedName);
            navigate(k_video_chat_route);
        }
        else {
            alert("Please enter a proper name");
        }
    }

    return (
        <div>
            <h1>Welcome to Video Chat!</h1>
            <form onSubmit={(event) => {handleFormSubmit(event)}}>
                <input type={"text"} placeholder={"your name"} value={name}
                       onChange={(event) => {setName(event.target.value)}}/>
                <button type={"submit"}>Submit</button>
            </form>
        </div>
    );
}

export default Home;