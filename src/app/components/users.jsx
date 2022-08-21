import React from 'react'
import { useParams } from 'react-router-dom'
import UsersList from '../components/usersList'
import UserPage from '../components/userPage'

const Users = () => {
    const { userId } = useParams()
    return <>{userId ? <UserPage id={userId} /> : <UsersList />}</>
}

export default Users
