'use client';
import React from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const RegisterForm = () => {
    //TODO: Call api to register user
    const createUserSchema: z.ZodSchema<Record<string, string>> = z.object({
        email: z.string({
            required_error: 'Email is required.'
        }).email({
            message: 'Please enter a valid email address.'
        }),
        name: z.string().min(1, 'Name is required.'),
        password: z.string().min(1, 'Password is required.'),
        passwordConfirmation: z.string().min(1, 'Password confirmation is required.')
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match.',
        path: ['passwordConfirmation']
    })

    type typeCreateUserInfer = z.infer<typeof createUserSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createUserSchema)
    });
    const onSubmit = (data: typeCreateUserInfer) => {
        console.log({ data })
    }

    return (
        <>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className='form-element'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder='Enter your email' {...register('email')} />
                    {errors.email && <p className='error'>{errors?.email.message?.toString()}</p>}
                </div>

                <div className='form-element'>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" placeholder='Enter your name' {...register('name')} />
                    {errors.name && <p className='error'>{errors?.name.message?.toString()}</p>}
                </div>


                <div className='form-element'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter your password' {...register('password')} />
                    {errors.password && <p className='error'>{errors?.password.message?.toString()}</p>}
                </div>

                <div className='form-element'>
                    <label htmlFor="passwordConfirmation">Confirm password</label>
                    <input type="password" id="passwordConfirmation " placeholder='Enter your confirm password' {...register('passwordConfirmation')} />
                    {errors.passwordConfirmation && <p className='error'>{errors?.passwordConfirmation.message?.toString()}</p>}
                </div>

                <button type='submit'>Submit</button>
            </form>
        </>
    )
}

export default RegisterForm