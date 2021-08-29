import React from 'react'
import { Route, Redirect } from 'react-router'
import QuestionsPage from './pages/QuestionsPage'
const ProdtectedRoute = ({userName,userId,isAuth, component, ...rest}) => {
    return (
        <>
            <Route {...rest} render={(props) =>{
                if (isAuth){
                    return <QuestionsPage userId={userId} userName={userName} />
                } else {
                    return <Redirect to={{ pathname:"/", state: {from: props.location}}} />
                }
            }}/>
        </>
    )
}

export default ProdtectedRoute
