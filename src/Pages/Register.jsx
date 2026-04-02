import { Button, Input, Select, SelectItem } from '@heroui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { sendRegister } from '../Services/authServices'
import { Link, useNavigate } from 'react-router-dom'
import { schema } from '../Schema/registerSchema'


export default function Register() {

  const [Loading, setLoading] = useState(false)
  const [ApiError, setApiError] = useState(null)

  const{handleSubmit, register, formState:{errors , touchedFields}} = useForm({
    defaultValues:{
      name:'',
      email:'',
      password:'',
      rePassword:'',
      dateOfBirth:'',
      gender:''
    }, 
    resolver:zodResolver(schema),
    mode:'onBlur',
    reValidateMode: 'onChange'
  })

  const navigate =  useNavigate()

  async function signUp(userData){
    setLoading(true)
    const response = await sendRegister(userData);

    if (response.message) {
      navigate('/login')
    }else{
      setApiError(response.error)
    }

    setLoading(false)
    
  }
  return <>
    <div className="flex min-h-screen justify-center items-center bg-gray-100">
      <div className='bg-white rounded-2xl shadow-2xl py-10 px-6 min-w-md'>
        <h1 className='text-2xl mb-4 text-center'>Register Now</h1>

        <form onSubmit={handleSubmit(signUp)} className='flex flex-col gap-4'>

          <Input isInvalid={Boolean(errors.name && touchedFields.name)} errorMessage={errors.name?.message} variant='bordered' label="Name" {...register('name')} type="text" />
          <Input isInvalid={Boolean(errors.email && touchedFields.email)} errorMessage={errors.email?.message} variant='bordered' label="Email" {...register('email')} type="email" />
          <Input isInvalid={Boolean(errors.password && touchedFields.password)} errorMessage={errors.password?.message} variant='bordered' label="Password" {...register('password')} type="password" />
          <Input isInvalid={Boolean(errors.rePassword && touchedFields.rePassword)} errorMessage={errors.rePassword?.message} variant='bordered' label="RePassword" {...register('rePassword')} type="password" />
          <div className="flex gap-3">
            <Input isInvalid={Boolean(errors.dateOfBirth && touchedFields.dateOfBirth)} errorMessage={errors.dateOfBirth?.message} variant='bordered' label="Date Of Birth" {...register('dateOfBirth')} type="date" />

            <Select isInvalid={Boolean(errors.gender)} errorMessage={errors.gender?.message} className="" variant='bordered' label="Select a gender" {...register('gender')}>  

              <SelectItem key={"male"}>Male</SelectItem>
              <SelectItem key={"feMale"}>feMale</SelectItem>
          
            </Select>
          </div>
          <Button isLoading={Loading} type='submit'>Register</Button>
          <div>If you have account please, <Link to={'/login'} className='text-blue-500'> Sign In</Link></div>
          {ApiError && <span className='text-center text-red-500'> {ApiError} </span>}
        </form>
      </div>
    </div>
  
  </>
}
