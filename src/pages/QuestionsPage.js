import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import {useHistory} from "react-router-dom";
import './homePage.css'

const QuestionsPage = ({userId, userName}) => {
    const history = useHistory();
    const [questions, setQuestions] = useState([])
    const [results , setResults] = useState([])


    useEffect(()=>{
        fetch('http://localhost:8000/quests')
          .then(res => res.json())
          .then(data => setQuestions(data))
      },[])


      function selectAnswer(e){
         const qq = e.target.attributes[0].textContent
         let erotisi = document.querySelector(`.question${qq[1]}`).textContent
         let ans = e.target.textContent
         let data = {
             "question" : erotisi,
             "answer" : ans
         }
         setResults([...results, data] )
          e.target.attributes[2].value = "1"
          e.target.style.background = "#30475E"
          console.log(qq)
          const  abc = document.querySelectorAll(`.${qq.slice(0, 2)}`);
          console.log(abc)
          abc.forEach((ab)=>{
              if(ab.dataset.select){
                  ab.disabled = true
              }
          })
     
      }

      function handleSub(){
          if(results.length === questions.length){
            fetch(`http://localhost:8000/users/${userId}`, {
                method: 'PATCH', // or 'PUT'
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({answers: results})})
              .then(response => response.json())
              .then(data => {
                console.log('Success:', data);
              })
              .catch((error) => {
                console.error('Error:', error);
              });
              history.goBack()
          }else{
              console.log("Not yet")
          }
          console.log(JSON.stringify(results))
      }

      function changeAnswer(e){
          const flag = e.target.dataset.change
          const data = document.querySelectorAll(`.q${flag}`)
          data.forEach((d)=>{
              d.dataset.select = "0"
              d.style.background = "#447eb8"
              d.disabled = false
          })
          console.log(data)
        
      }
    return (
        <div className="questions">
            <div className="title">Συμπληρώστε το ερωτηματολόγιο <span className="currentUser">{userName}</span></div>
            { 
                questions.map((q)=>(
                    
                    <div className="quest" key={q.id}>
                        <div className={`question${q.id} erotisi`}>{q.question}</div>
                        <div className="answers" >
                            <button className={`q${q.id} ans`} id={`answer${q.answers[0].number}`} data-select="0" onClick={selectAnswer}>{q.answers[0].answer}</button>
                            <button className={`q${q.id} ans`} id={`answer${q.answers[0].number}`} data-select="0" onClick={ selectAnswer}>{q.answers[1].answer}</button>
                            <button className={`q${q.id} ans`} id={`answer${q.answers[0].number}`}  data-select="0" onClick={selectAnswer}>{q.answers[2].answer}</button>
                            <button className={`q${q.id} ans`} id={`answer${q.answers[0].number}`}  data-select="0" onClick={selectAnswer}>{q.answers[3].answer}</button>
                            <button className="changeAnswer" data-change={q.id} onClick={changeAnswer}>Αλλαξε απαντηση</button>
                        </div>
                    </div>
                ))
            }

            <button className="sub" onClick={handleSub}>Υποβολή</button>
        </div>
    )
}

export default withRouter(QuestionsPage)
