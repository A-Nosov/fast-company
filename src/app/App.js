import React from 'react'
import Users from './components/users'
import { Route, Switch } from 'react-router-dom'
import NavBar from './components/navBar'
import Main from './components/main'
import Login from './components/login'

function App() {
    return (
        <>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/login" component={Login} />
                <Route path="/users/:userId" component={Users} />
                <Route path="/users" component={Users} />
            </Switch>
        </>
    )
}

export default App
