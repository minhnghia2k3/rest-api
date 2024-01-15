import { z } from 'zod';
// Used for all of our user endpoints
export const createUserSchema = z.object({
    body: z.object({
        email: z.string({
            required_error: 'Email is required.'
        }).email({
            message: 'Please enter a valid email address.'
        }),
        name: z.string({
            required_error: 'Name is required.'
        }),
        password: z.string({
            required_error: 'Password is required.'
        }).min(6, 'Password is too short - should be 6 chars minimum.'),
        passwordConfirmation: z.string({
            required_error: 'Confirm password is required.'
        })
    }).refine((data) => data.password === data.passwordConfirmation, {
        message: 'Passwords do not match.',
        path: ['passwordConfirmation']
    })
})


export type CreateUserInput = z.infer<typeof createUserSchema>
