import React from 'react'
import { useParams } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage/editUserPage'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    return (
        <>
            {userId ? (
                edit ? (
                    <EditUserPage />
                ) : (
                    <UserPage userId={userId} />
                )
            ) : (
                <UsersListPage />
            )}
        </>
    )
}

export default Users
