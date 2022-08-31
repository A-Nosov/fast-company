import React, { useState, useEffect } from 'react'
import { validator } from '../../../utils/validator'
import api from '../../../api'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import PropTypes from 'prop-types'

const EditUserPage = ({ userId }) => {
    const [data, setData] = useState({
        name: '',
        email: '',
        profession: '',
        sex: 'male',
        qualities: []
    })
    const [qualities, setQualities] = useState([])
    const [professions, setProfession] = useState([])
    const [errors, setErrors] = useState({})
    useEffect(() => {
        api.users.getById(userId).then((data) =>
            setData((prevState) => ({
                ...prevState,
                name: data.name,
                email: data.email,
                profession: data.profession._id,
                sex: data.sex,
                qualities: data.qualities.map((qualitiy) => ({
                    color: qualitiy.color,
                    label: qualitiy.name,
                    value: qualitiy._id
                }))
            }))
        )
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfession(professionsList)
        })
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
    }, [])

    const getProfessionById = (id) => {
        for (const prof of professions) {
            if (prof.value === id) {
                return { _id: prof.value, name: prof.label }
            }
        }
    }
    const getQualities = (elements) => {
        const qualitiesArray = []
        for (const elem of elements) {
            for (const quality in qualities) {
                if (elem.value === qualities[quality].value) {
                    qualitiesArray.push({
                        _id: qualities[quality].value,
                        name: qualities[quality].label,
                        color: qualities[quality].color
                    })
                }
            }
        }
        return qualitiesArray
    }

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const validatorConfig = {
        name: {
            isRequired: {
                massage: 'Имя обязательно для заполнения'
            }
        },
        email: {
            isRequired: {
                massage: 'Электронная почта обязательна для заполнения'
            },
            isEmail: { massage: 'Email введен некорректно' }
        },
        profession: {
            isRequired: {
                massage: 'Обязательно выберите вашу профессию'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        const { profession, qualities } = data
        console.log({
            ...data,
            profession: getProfessionById(profession),
            qualities: getQualities(qualities)
        })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4">
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Имя"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            error={errors.name}
                        />
                        <TextField
                            label="Электронная почта"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            error={errors.email}
                        />
                        <SelectField
                            label="Выбери свою профессию"
                            defaultOption={'Choose...'}
                            name="profession"
                            options={professions}
                            onChange={handleChange}
                            value={data.profession}
                            error={errors.profession}
                        />
                        <RadioField
                            options={[
                                { name: 'Male', value: 'male' },
                                { name: 'Female', value: 'female' },
                                { name: 'Other', value: 'other' }
                            ]}
                            value={data.sex}
                            name="sex"
                            onChange={handleChange}
                            label="Выберите ваш пол"
                        />
                        <MultiSelectField
                            options={qualities}
                            onChange={handleChange}
                            defaultValue={data.qualities}
                            name="qualities"
                            label="Выберите ваши качества"
                        />
                        <button
                            type="submit"
                            disabled={!isValid}
                            className="btn btn-primary w-100 mx-auto"
                        >
                            Обновить
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
EditUserPage.propTypes = {
    userId: PropTypes.string
}

export default EditUserPage
