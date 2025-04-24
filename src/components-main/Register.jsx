import React from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { toast } from 'sonner'
import { Label } from '@radix-ui/react-label'
import { Input } from '../components/ui/input'
import { Button } from '../components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { registerUserThunk } from '../store/thunks/authThunk'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'

const initialValues = {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const Register = ({ setisLogin }) => {

    const { isLoading } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const formik = useFormik({
        initialValues,
        validationSchema: Yup.object({
            username: Yup.string().required('Username is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string()
                .matches(/[a-z]/, "Minimum 1 lowercase character required")
                .matches(/[A-Z]/, "Minimum 1 uppercase character is required")
                .matches(/[0-9]/, "Minimun 1 digit is required")
                .matches(/[@!#$_]/, "Minimun 1 special character is required")
                .min(8, "Minimum 8 character are required")
                .required('Password is required'),
            confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], "Confirm password must same as password").required('Confirm password is required'),
        }),
        onSubmit: (values) => {
            try {
                delete values.confirmPassword
                dispatch(registerUserThunk(values))
                    .unwrap()
                    .then(() => {
                        toast.success('Registration successful! Please login.', {
                            duration: 3000,
                        })
                        resetForm()
                        setisLogin(true)
                    })
                    .catch((err) => {
                        toast.error(err?.message || 'Registration failed. Please try again.', {
                            duration: 3000,
                        })
                    })
            } catch {
                toast.error('Something went wrong. Please try again.', {
                    duration: 3000,
                })
                resetForm()
            }
        }
    })

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = formik

    return (
        <Card className='w-full max-w-[450px]'>
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Register</CardTitle>
                <CardDescription className='text-center'>Enter your information below to create an account.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Username</Label>
                        <Input
                            id="username"
                            type="username"
                            name="username"
                            onBlur={handleBlur}
                            value={values.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            className={`${errors.username && touched.username ? 'border-red-500' : ''}`}
                        />
                        {errors.username && touched.username && <p className='text-red-500 text-sm'>{errors.username}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            name="email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            placeholder="Enter your email"
                            className={`${errors.email && touched.email ? 'border-red-500' : ''}`}
                        />
                        {errors.email && touched.email && <p className='text-red-500 text-sm'>{errors.email}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            name="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            placeholder="Enter your password"
                            className={`${errors.password && touched.password ? 'border-red-500' : ''}`}
                        />
                        {errors.password && touched.password && <p className='text-red-500 text-sm'>{errors.password}</p>}
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Confirm Password</Label>
                        <Input
                            id="confirmPassword"
                            type="password"
                            name="confirmPassword"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.confirmPassword}
                            placeholder="Confirm your password"
                            className={`${errors.confirmPassword && touched.confirmPassword ? 'border-red-500' : ''}`}
                        />
                        {errors.confirmPassword && touched.confirmPassword && <p className='text-red-500 text-sm'>{errors.confirmPassword}</p>}
                    </div>
                    <Label onClick={() => setisLogin(true)} className='text-sm font-[400] cursor-pointer ml-2 hover:text-blue-500 hover:underline'>Already have an account? Login</Label>
                    <Button disabled={isLoading} className="w-full bg-red-600 text-white hover:bg-red-600 cursor-pointer mt-5" onClick={handleSubmit}>Register</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default Register