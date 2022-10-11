import React from 'react'
import useMockData from '../utils/mockData'

const Main = () => {
    const { initialize } = useMockData()
    const handleClick = () => {
        console.log('clicked')
        initialize()
    }
    return (
        <div className="container mt-5">
            <h1> Main Page</h1>
            <h3>Инициализация данных в FireBase</h3>
            <button className="btn btn-primary" onClick={handleClick}>
                Инициализировать
            </button>
        </div>
    )
}

export default Main
