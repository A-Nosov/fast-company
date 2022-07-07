import React, { useState } from 'react'
import api from '../api'

const Users = () => {
    const [users, setUsers] = useState(api.users.fetchAll())
    const declensionOfNouns = (number, nouns) => {
        if (number % 10 === 1 || (number % 100 > 4 && number % 100 < 20)) {
            return nouns[0]
        } else {
            return nouns[1]
        }
    }
    const handleDelete = (userId) => {
        setUsers((prevState) => prevState.filter((user) => user._id !== userId))
    }
    const renderPhrase = (number) => {
        return number === 0 ? (
            <h3>
                <span className="badge bg-danger">
                    Никто с тобой не тусанет
                </span>
            </h3>
        ) : (
            <h3>
                <span className="badge bg-primary">
                    {number}{' '}
                    {declensionOfNouns(users.length, ['человек', 'человека'])}{' '}
                    тусанет с тобой сегодня
                </span>
            </h3>
        )
    }

    const renderTableBody = () => {
        return users.map((user) => (
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((qualities) => (
                        <span
                            key={qualities._id}
                            className={'badge me-2 bg-' + qualities.color}
                        >
                            {qualities.name}
                        </span>
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate + ' /5'}</td>
                <td>
                    <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(user._id)}
                    >
                        delete
                    </button>
                </td>
            </tr>
        ))
    }

    const renderTable = () => {
        return (
            <table className="table align-middle">
                <thead>
                    <tr>
                        <th scope="col">Имя</th>
                        <th scope="col">Качества</th>
                        <th scope="col">Профессия</th>
                        <th scope="col">Встретился, раз</th>
                        <th scope="col">Оценка</th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>{renderTableBody()}</tbody>
            </table>
        )
    }

    if (users.length !== 0) {
        return (
            <>
                {renderPhrase(users.length)}
                {renderTable()}
            </>
        )
    }

    return <>{renderPhrase(users.length)}</>
}

export default Users
