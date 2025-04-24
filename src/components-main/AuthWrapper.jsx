import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet, useNavigate } from 'react-router-dom'
import { ROUTER } from '../utils/routes'

const AuthWrapper = () => {
    const navigate = useNavigate()
    const { token } = useSelector(state => state.auth)

    useEffect(() => {
        if (!token) {
            navigate(ROUTER.login)
        }
    }, [token, navigate])

    return token ? <Outlet /> : null
}

export default AuthWrapper