import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import { useHistory } from 'react-router-dom'
import QualitiesList from './qualitiesList'

const UserPage = ({ userId }) => {
    const history = useHistory()
    const [user, setUser] = useState()
    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data))
    }, [])
    const handleClick = () => {
        history.push('/users')
    }
    if (user) {
        return (
            <div>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button className="btn btn-outline-dark" onClick={handleClick}>
                    Все пользователи
                </button>
            </div>
        )
    } else {
        return <h1>Loading</h1>
    }
}

export default UserPage

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}
