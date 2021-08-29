import {useEffect  , useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import ProdtectedRoute from '../ProdtectedRoute';
import QuestionsPage from '../pages/QuestionsPage';
import {
    BrowserRouter as Router,
    Switch,
    Route
  } from "react-router-dom";
  import './homePage.css'

const HomePage = ({handleLogin, error}) => {

    const [name, setName] = useState("")
    const [pass, setPass] = useState("")

    return (
        <div className="homePage">
           <div className="title">Καλώς ήρθατε στο ερωτηματολόγιο</div>
                    <div className="allfields">
                        <div className="field">
                            <div className="name">Όνομα</div>
                            <input type="text"  id="name" className="inputName" onChange= {(e)=> setName(e.target.value) } />
                        </div>
                        <div className="field">
                            <div className="pass">Κωδικός</div>
                            <input type="password"  id="password" className="inputPassword" onChange= {(e)=> setPass(e.target.value) }  />
                        </div>
                    </div>
                 <div className="buttons">
                    <Link to="/questions">  <button className="login" onClick={() => handleLogin(name, pass)}>Συνδεση</button></Link>
                    <Link to="/sing"> <button className="create">Εγρραφή</button> </Link>
                 </div>   
                
                

                {error && <div className="error">{error}</div>}
      

        </div>
    )
}

export default HomePage
