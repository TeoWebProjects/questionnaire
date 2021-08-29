
import './App.css';
import HomePage from './pages/HomePage';
import {useState, useEffect} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import ProdtectedRoute from './ProdtectedRoute';
import QuestionsPage from './pages/QuestionsPage';
import { useHistory } from "react-router-dom";
import CreateAccountPage from './pages/CreateAccountPage';


function App() {
    let history = useHistory();
    const [users, setUsers] = useState([])
    const [userName, setUserName] = useState("")
    const [userId, setUserId] = useState("")
    const [error, setError] = useState("")
    const [isAuth, setisAuth] = useState(false)
    let find = false
    

    function handleLogin(name, pass, id){
      users.forEach(user => {
        if(name === user.name && pass === user.password){
          find = true
          setisAuth(true)   
          setUserName(user.name)
          setUserId(user.id)
        }  
      
      });

      if(!find){
       setError("Λάθος Όνομα ή Κωδικός")
      }
    }

    useEffect(()=>{
      fetch('http://localhost:8000/users')
        .then(res => res.json())
        .then(data => setUsers(data))
    },[])

  return (
  <Router>
    <div className="App">
          <Route exact path="/"> <HomePage handleLogin={handleLogin} error={error} /> </Route>
          <Route  path="/sing"> <CreateAccountPage/> </Route>
          {/* <Route  path="/questions"> <QuestionsPage /> </Route> */}
          <ProdtectedRoute path="/questions" component={QuestionsPage} isAuth={isAuth} userName={userName} userId={userId} />
    </div>
  </Router>
  );
}

export default App;
