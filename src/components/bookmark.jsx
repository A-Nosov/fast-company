import React from 'react'

const BookMark = ({ status }) => {
    if (status) {
        return (
            <>
                <i className="bi bi-bookmark-fill"></i>
            </>
        )
    }
    return (
        <>
            <i className="bi bi-bookmark"></i>
        </>
    )
}

export default BookMark
