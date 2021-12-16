import {Card, Button} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'

const Post = (props) =>{
    const postsList = props.items; //get the list of posts as a prop
    const navigate = useNavigate(); //calling navigate() function sends us to the post page with all the comments

    return (
        
        <div>
            {/*posts are mapped using bootstrap cards*/}
            {postsList.map((post) =><Card key={post._id}>
                <Card.Body>
                    <Card.Title>{post.title}</Card.Title>
                    <Card.Text>{post.description}</Card.Text>
                    <footer><small className="text-muted">{post.user}</small> <small className="text-muted">{post.datetime.substring(0, 10)}</small></footer>
                    <Button className="btn btn-primary" onClick={() => {navigate('/viewPost/'+post._id)}}>Show more</Button>
                </Card.Body>
            </Card>)}
        </div>
    );
}

export default Post;