import React from 'react'
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom'

export default function PrivateRouter({component: Component, ...rest}) {
  const userLogin = useSelector((state) => state.userLogin);
  const {userInfo} = userLogin;
  return (
    <Route
      {...rest}
      component={(props) => {
        if(userInfo && userInfo.isAdmin){
          return <Component {...props}/>
        } else {
          return(<Redirect to={"/login"} />)
        }
      }}
    />
  )
}
