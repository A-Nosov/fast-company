import React from 'react'
import PropTypes from 'prop-types'
import Quality from './quality'
import { useQualities } from '../../../hooks/useQualities'

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQuality } = useQualities()
    const qualitiesList = qualities.map((quality) => getQuality(quality))
    if (!isLoading) {
        return (
            <>
                {qualitiesList.map((qual) => (
                    <Quality
                        key={qual._id}
                        color={qual.color}
                        name={qual.name}
                        id={qual._id}
                    />
                ))}
            </>
        )
    } else return 'Loading...'
}

QualitiesList.propTypes = {
    qualities: PropTypes.array
}

export default QualitiesList
