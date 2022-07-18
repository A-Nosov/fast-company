import React from 'react'
import Qualitie from './qualitie'
import BookMark from './bookmark'

const User = ({ user, rest }) => {
    return (
        <>
            <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                    {user.qualities.map((item) => (
                        <Qualitie
                            key={item._id}
                            color={item.color}
                            name={item.name}
                        />
                    ))}
                </td>
                <td>{user.profession.name}</td>
                <td>{user.completedMeetings}</td>
                <td>{user.rate} /5</td>
                <td>
                    <button onClick={() => rest.onToggleBookMark(user._id)}>
                        <BookMark status={user.bookmark} />
                    </button>
                </td>
                <td>
                    <button
                        onClick={() => rest.onDelete(user._id)}
                        className="btn btn-danger"
                    >
                        delete
                    </button>
                </td>
            </tr>
        </>
    )
}

export default User
