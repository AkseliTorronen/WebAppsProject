import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import PostView from "./components/PostView";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Register from "./components/Register";
import MyContainer from "./components/MyContainer";
import {Container} from 'react-bootstrap'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  

  return (
      <Container>
      <div className="App">
        <h1>Overflow of the stack variety</h1>
        <div>
          <a href="/">Home</a> <a href="/users/login">Login</a> <a href="/users/register">Register</a> <a href="/users/logout">Logout</a>
        </div>
        
        <Router>
          <Routes>
            <Route path="/" element={<MyContainer/>}/>
            <Route path="/viewPost/:id" element={<PostView/>}/>
            <Route path="/users/login" element={<Login/>}/>
            <Route path="/users/register" element={<Register/>}/>
            <Route path="/users/logout" element={<Logout/>}/>
          </Routes>
        </Router>
        
      </div>
      </Container>
  );
}

export default App;
