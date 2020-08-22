import axios from 'axios'

import { setAlert } from './alert'
import * as actionTypes from './types'
import setAuthToken from '../utils/setAuthToken'

export const loadUser = () => async (dispatch) => {
	if (localStorage.token) {
		setAuthToken(localStorage.token)
	}
	try {
		const res = await axios.get('/api/auth')
		dispatch({
			type: actionTypes.USER_LOADED,
			payload: res.data,
		})
	} catch (err) {
		dispatch({
			type: actionTypes.AUTH_ERROR,
		})
	}
}

export const register = ({ name, email, password }) => async (dispatch) => {
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	}
	const body = JSON.stringify({ name, email, password })
	try {
		const res = await axios.post('/api/users', body, config)
		dispatch({
			type: actionTypes.REGISTER_SUCCESS,
			payload: res.data,
		})
	} catch (err) {
		const errors = err.response.data.errors
		if (errors) {
			errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')))
		}
		dispatch({
			type: actionTypes.REGISTER_FAIL,
		})
	}
}