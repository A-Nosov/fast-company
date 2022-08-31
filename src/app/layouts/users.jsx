import React from 'react'
import { useParams } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage/editUserPage'

const Users = () => {
    const { userId, edit } = useParams()
    if (userId) {
        if (edit) {
            return <EditUserPage userId={userId} />
        } else {
            return <UserPage userId={userId} />
        }
    } else {
        return <UsersListPage />
    }
}

export default Users
