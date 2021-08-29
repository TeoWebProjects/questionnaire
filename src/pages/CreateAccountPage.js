import React from 'react'
import { Link } from 'react-router-dom'
import { useHistory } from "react-router-dom";

const CreateAccountPage = () => {
    let history = useHistory();
    function createAccount(){
        const inputName = document.querySelector(".inputName")
        const nameValue = inputName.value
        const inputLastname = document.querySelector(".inputLastname")
        const lastnameValue = inputLastname.value
        const inputEmail = document.querySelector(".inputEmail")
        const emailValue = inputEmail.value
        const inputAge = document.querySelector(".inputAge")
        const ageValue = inputAge.value
        const inputPassword = document.querySelector(".inputPassword")
        const passwordValue = inputPassword.value
        const confirmPassword = document.querySelector(".inputConfirmPassword")
        const confirmPasswordValue = confirmPassword.value
        const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if( nameValue.length > 3 && lastnameValue.length > 3 && emailValue.match(mailformat) && ageValue > 15 && passwordValue.length > 4 && passwordValue === confirmPasswordValue){
            fetch('http://localhost:8000/users/', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({      
                name: nameValue,
                lastname: lastnameValue,
                email: emailValue,
                age: ageValue,
                password: passwordValue,
                admin: "false",
                answers: []}),
                })
                .then(response => response.json())
                .then(data => {
                console.log('Success:', data)
                history.push('/')
                })
                .catch((error) => {
                    console.error('Error:', error)
                });
        }else{
            console.log("λαθος στοιχεια")
        }
    
    }
    return (
        <div className="CreateAcc">
            <Link to="/"><button className="back">Πίσω</button></Link>
            <div className="title">Καλώς ήρθατε στο ερωτηματολόγιο</div>
                    <div className="allfields2">
                        <div className="field">
                            <div className="name">Όνομα</div>
                            <input type="text"  id="name" className="inputName"  />
                        </div>
                        <div className="field">
                            <div className="pass">Επίθετο</div>
                            <input type="text"  id="lastname" className="inputLastname" />
                        </div>
                        <div className="field">
                            <div className="pass">Email</div>
                            <input type="email"  id="email" className="inputEmail" />
                        </div>
                        <div className="field">
                            <div className="pass">Ηλικία</div>
                            <input type="number"  id="age" className="inputAge" />
                        </div>
                        <div className="field">
                            <div className="pass">Κωδικός</div>
                            <input type="password"  id="password" className="inputPassword" />
                        </div>
                        <div className="field">
                            <div className="pass">Επαλήθευση Κωδικού</div>
                            <input type="password"  id="confirmPassword" className="inputConfirmPassword" />
                        </div>
                    </div>
                <button className="cc" onClick={() => createAccount()}>Δημιουργία</button>
               
                 
                
        </div>
    )
}

export default CreateAccountPage
