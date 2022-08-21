import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import api from '../api'
import { useHistory } from 'react-router-dom'
import QualitiesList from './qualitiesList'

const UserPage = ({ id }) => {
    const [user, setUser] = useState()
    const history = useHistory()
    useEffect(() => {
        api.users.getById(id).then((data) => setUser(data))
    }, [])
    const handleReturn = () => {
        history.replace('/users')
    }
    if (user) {
        return (
            <>
                <h1>{user.name}</h1>
                <h2>Профессия: {user.profession.name}</h2>
                <QualitiesList qualities={user.qualities} />
                <p>completedMeetings: {user.completedMeetings}</p>
                <h2>Rate: {user.rate}</h2>
                <button
                    className="btn btn-outline-dark"
                    onClick={() => handleReturn()}
                >
                    Все пользователи
                </button>
            </>
        )
    } else {
        return <h1>Loading</h1>
    }
}

export default UserPage

UserPage.propTypes = {
    id: PropTypes.string.isRequired
}
