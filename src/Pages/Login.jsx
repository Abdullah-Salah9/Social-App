import { Button, Input } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useContext, useState } from 'react'
import { useForm } from 'react-hook-form'
import { schema } from '../Schema/loginSchema'
import { sendLogin } from '../Services/authServices'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Context/AuthContext'

export default function Login() {

  

const [Loading, setLoading] = useState(false)
const [ApiError, setApiError] = useState(null)

  const{handleSubmit, register, formState:{errors, touchedFields}} = useForm({
    defaultValues:{
      email: '',
      password: ''
    },
    resolver:zodResolver(schema),
    mode:'onBlur',
    reValidateMode:'onChange'
  })
  
  const navigate = useNavigate()

  const {setIsLoggedIn} = useContext(AuthContext)

  async function login(userData) {
    setLoading(true)
    
    const response = await sendLogin(userData);

    if (response.message) {
      localStorage.setItem('token', response.token);
      setIsLoggedIn(response.token)
      // navigate('/')
    }else{
      setApiError(response.error)
    }

    setLoading(false)
  }


  return <>
  <div className="flex min-h-screen justify-center items-center bg-gray-100">
    <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
        <h1 className='text-2xl mb-4 text-center'>Login Now</h1>

        <form onSubmit={handleSubmit(login)} className='flex flex-col gap-4'>

          <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message} variant='bordered' label="Email" {...register('email')} type="email" />
          <Input isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message} variant='bordered' label="Password" {...register('password')} type="password" />
          
          <Button isLoading={Loading} type='submit'>Register</Button>
          <div>If you havent account please, <Link to={'/register'} className='text-blue-500'> Sign Up</Link></div>
          {ApiError && <span className='text-center text-red-500'> {ApiError} </span>}
        </form>
    </div>
  </div>
  </>
}
