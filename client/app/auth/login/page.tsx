'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const Login = () => {
    const [error, setError] = useState('')
    const router = useRouter();
    const HOST = process.env.NEXT_PUBLIC_SERVER || ''

    const createSessionSchema: z.ZodSchema<Record<string, string>> = z.object({
        email: z.string({
            required_error: 'Email is required.'
        }).email({
            message: 'Please enter a valid email address.'
        }),
        password: z.string().min(1, 'Password is required.'),
    })

    type CreateSessionInput = z.infer<typeof createSessionSchema>

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(createSessionSchema)
    });

    const onSubmit = async (data: CreateSessionInput) => {
        try {
            const user = await fetch(`${HOST}/api/sessions`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            })
            const response = await user.json()
            if (response.success === true) {
                router.push('/')
            }
            setError(response.message)
        } catch (error: any) {
            setError(error.message)
        }
    }

    return (
        <>
            <p>{error}</p>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
                <div className='form-element'>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" placeholder='Enter your email' {...register('email')} />
                    {errors.email && <p className='error'>{errors?.email.message?.toString()}</p>}
                </div>

                <div className='form-element'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" placeholder='Enter your password' {...register('password')} />
                    {errors.password && <p className='error'>{errors?.password.message?.toString()}</p>}
                </div>

                <button type='submit'>Login</button>
            </form>
        </>
    )
}

export default Login