
import {useEffect, useState} from "react"
import {useParams} from 'react-router-dom'
import {Card} from 'react-bootstrap'

const PostView = () => {
    const [content, setText] = useState('')
    const [comments, setComments] = useState([])
    const [post, setPost] = useState({})
    const {id} = useParams();

    //fetch post info and comments that were posted under this specific post

    useEffect(() => {
        fetch("/viewPost/"+ id)
            .then(response => response.json())
            .then(json => {setComments(json.comments); setPost(json.post)})

    }, [id])



    const onSubmit = (e) => {
        e.preventDefault()
        //submit new comment with the current user's token
        const token = "Bearer "+window.localStorage.getItem("auth_token")
        const obj = {content: content}

        fetch("/viewPost/"+id, {
            method: "POST",
            headers: {
                "Content-type": "application/json",
                Authorization: token
            },
            body: JSON.stringify(obj),
            mode: "cors"
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
            })
            
        setText("")
        window.location.reload(false) //reload page so the new comment is shown under the post 
    }


    return (
        <div>
            <Card key={post._id}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <Card.Text>{post.snippet}</Card.Text>
                    <footer><small className="text-muted">{post.user}</small> <small className="text-muted">{post.datetime}</small></footer>
                </Card.Body>
            </Card>
            
            <form onSubmit={onSubmit}>
                <label>New comment</label>
                <textarea placeholder="Comment here" onChange={(e) => setText(e.target.value)} value={content}></textarea>
                <button type="submit">Add Comment</button>
            </form>
            {/*comments are mapped similarly to posts using bootstrap cards*/}
            <div>
            {comments.map((comment) =><Card key={comment._id}>
                <Card.Body>
                    <Card.Text>{comment.content}</Card.Text>
                    <footer><small className="text-muted">{comment.user}</small> <small className="text-muted">{comment.datetime.substring(0, 10)} at {comment.datetime.substring(11,16)}</small></footer>
                </Card.Body>
            </Card>)}
        </div>
        </div>
    );
}

export default PostView;