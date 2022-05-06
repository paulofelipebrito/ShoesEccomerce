import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRouter({component: Component, ...rest}) {
  return (
    <Route
      {...rest}
      component={(props) => {
        const token = window.localStorage.getItem('userInfo');
        if(token){
          return <Component {...props}/>
        } else {
          return(<Redirect to={"/login"} />)
        }
      }}
    />
  )
}
