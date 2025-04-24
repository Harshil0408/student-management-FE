import * as Yup from 'yup'
import { toast } from 'sonner'
import { useFormik } from 'formik'
import { useState } from 'react'
import { ROUTER } from '../utils/routes'
import { LogoSVG } from '../assets/svg/Svg'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useNavigate } from 'react-router-dom'
import banner from '../assets/ic_login_side.jpg'
import { Button } from "../components/ui/button"
import { emailRegex } from '../utils/regex/regex'
import Register from '../components-main/Register'
import { Checkbox } from "../components/ui/checkbox"
import { useDispatch, useSelector } from 'react-redux'
import { loginUserThunk } from '../store/thunks/authThunk'
import { setTokens } from '../store/slices/authSlice'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"

const formSchema = Yup.object({
  email: Yup.string().matches(emailRegex, 'Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
})

const initialValues = {
  email: '',
  password: '',
}

const Login = () => {

  const dispatch = useDispatch()
  const { isLoading } = useSelector((state) => state.auth)
  const [isLogin, setisLogin] = useState(true)
  const navigate = useNavigate()


  const formik = useFormik({
    initialValues,
    validationSchema: formSchema,
    onSubmit: (values) => {
      try {
        dispatch(loginUserThunk(values))
          .unwrap()
          .then((res) => {
            if (res.data) {
              dispatch(setTokens(res.data));

              toast.success('Login successful!', {
                duration: 3000,
              });

              navigate(ROUTER.students);
            }
            resetForm();
          })
          .catch((err) => {
            toast.error(err?.message || 'Login failed. Please try again.', {
              duration: 3000,
            });
          });
      } catch {
        toast.error('Something went wrong. Please try again.', {
          duration: 3000,
        });
        resetForm();
      }
    }
  })

  const { values, errors, touched, handleChange, handleBlur, handleSubmit, resetForm } = formik

  return (
    <div className='flex h-screen'>
      <div className='hidden h-full relative bg-muted lg:block w-[50%]'>
        <img className='w-full h-[100vh] object-cover' src={banner} alt="" />
        <div className='absolute top-4 left-6 w-1/3 aspect-video flex items-center justify-center object-contain'>
          <LogoSVG />
        </div>
        <div className='absolute bottom-6 left-6 flex flex-col gap-2 text-primary-foreground sm:gap-4 text-xl text-left w-8/12 leading-7'>
          <span>"Success is not final, failure is not fatal: It is the courage to <br /> continue that counts."</span>
          <span>Winston Churchill</span>
        </div>
      </div>

      <div className='w-full lg:w-[50%] flex items-center justify-center p-8'>
        {
          isLogin ? (
            <Card className='w-full max-w-[450px]'>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold text-center">Login</CardTitle>
                <CardDescription className='text-center'>Enter your information below to login.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      onBlur={handleBlur}
                      value={values.email}
                      onChange={handleChange}
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="remember" />
                      <Label htmlFor="remember" className="text-sm font-[400]">Remember me</Label>
                    </div>
                    <Button variant="link" className="px-0 text-sm cursor-pointer font-[400]">Forgot password?</Button>
                  </div>
                  <Label onClick={() => setisLogin(false)} className='text-sm font-[400] cursor-pointer hover:text-blue-500 hover:underline'>Don't have an account? create one</Label>
                  <Button disabled={isLoading} className="w-full bg-red-600 text-white hover:bg-red-600 cursor-pointer" onClick={handleSubmit}>Sign in</Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Register setisLogin={setisLogin} />
          )
        }
      </div>
    </div>
  )
}

export default Login