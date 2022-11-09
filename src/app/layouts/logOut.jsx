import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loggOut } from '../store/users'
const LogOut = () => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loggOut())
    }, [])
    return <h1>Loading</h1>
}

export default LogOut
