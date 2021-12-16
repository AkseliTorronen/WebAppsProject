import Post from "./Post";
import {useState, useEffect} from "react";

const MyContainer = () => {
    const [title, setTitle] = useState('')
    const [description, setDesc] = useState('')
    const [snippet, setSnippet] = useState('')
    const [posts, setPosts] = useState([])
    //retrieve posts from backend
    useEffect(() => {
        fetch("/posts")
          .then(response => response.json())
          .then(json => setPosts(json.posts))
    
      }, [])


    const onSubmit = (e) => {
        const token = "Bearer "+window.localStorage.getItem("auth_token")
        e.preventDefault()
        const newPost = {"title": title, "description": description, "snippet": snippet}
        //send the new post to backend with current user's token
        fetch("/", {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(newPost),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
        //reset text fields    
        setTitle("")
        setDesc("")
        setSnippet("")
        window.location.reload(false) //reload page so you see the new post on home page
    }

    

    return(
        <div>
            
            <form onSubmit={onSubmit}>
                <label>Add new Post</label>
                <textarea placeholder="Title here" onChange={(e) => setTitle(e.target.value)} value={title}></textarea>
                <textarea placeholder="Description here here" onChange={(e) => setDesc(e.target.value)} value={description}></textarea>
                <textarea placeholder="Snippet here" onChange={(e) => setSnippet(e.target.value)} value={snippet}></textarea>
                <button type="submit">Add Post</button>
            </form>
            <Post
            items={posts}/>
        </div>
        
    )
}

export default MyContainer;