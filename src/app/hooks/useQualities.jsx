import React, { useContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import qualitiesService from '../services/qualities.service'
import { toast } from 'react-toastify'

const QualitiesContex = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContex)
}

export const QualitiesProvider = ({ children }) => {
    const [isLoading, setLoading] = useState(true)
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)
    useEffect(() => {
        if (error !== null) {
            toast(error)
            setError(null)
        }
    }, [error])

    useEffect(() => {
        getQualitiesList()
    }, [])
    function errorCatcher(error) {
        const { message } = error.response.data
        setError(message)
    }
    const getQuality = (id) => {
        return qualities.find((q) => q._id === id)
    }

    async function getQualitiesList() {
        try {
            const { content } = await qualitiesService.get()
            setQualities(content)
            setLoading(false)
        } catch (error) {
            errorCatcher(error)
        }
    }

    return (
        <QualitiesContex.Provider value={{ isLoading, qualities, getQuality }}>
            {children}
        </QualitiesContex.Provider>
    )
}

QualitiesProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
}
