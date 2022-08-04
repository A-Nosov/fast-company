import React, { useState, useEffect } from 'react'
import Users from './components/users'
import api from './api'

function App() {
    const [users, setUsers] = useState()

    const handleDelete = (userId) => {
        setUsers(users.filter((user) => user._id !== userId))
    }
    const handleToggleBookMark = (id) => {
        setUsers(
            users.map((user) => {
                if (user._id === id) {
                    return { ...user, bookmark: !user.bookmark }
                }
                return user
            })
        )
    }
    useEffect(() => {
        api.users.fetchAll().then((data) => setUsers(data))
    }, [])

    return (
        users && (
            <div>
                <Users
                    users={users}
                    onDelete={handleDelete}
                    onToggleBookMark={handleToggleBookMark}
                />
            </div>
        )
    )
}

export default App
