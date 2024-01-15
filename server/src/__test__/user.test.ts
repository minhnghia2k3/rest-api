import request from 'supertest';
/* Services */
import * as UserService from '../service/user.service';
import * as SessionService from '../service/session.service';

import mongoose from 'mongoose';
import createServer from '../utils/server'
import { createUserSessionHandler } from '../controllers/session.controller';

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

const sessionPayload = {
    _id: new mongoose.Types.ObjectId().toString(),
    user: userId,
    valid: true,
    userAgent: 'test',
    createdAt: new Date("2024-01-13T15:47:21.756+00:00"),
    updatedAt: new Date("2024-01-13T15:47:21.756+00:00"),
}

const userPayload = {
    _id: userId,
    email: "jane.doe@example.com",
    name: "Jane Doe",
};

const userInput = {
    email: "test@example.com",
    name: "Jane Doe",
    password: "Password123",
    passwordConfirmation: "Password123",
};

describe('User', () => {
    // user registration
    describe('user registration', () => {
        // The username and password get validation
        describe('given the valid email & password', () => {
            it('should return a 201 and the user payload.', async () => {
                // mock the createUser service method
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    //@ts-ignore
                    .mockReturnValueOnce(userPayload)

                const { body, statusCode } = await request(app)
                    .post('/api/users')
                    .send(userInput)

                expect(statusCode).toBe(201)
                expect(body.data).toEqual(userPayload)
                // verify that the createUser service method was called with the correct arguments
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput)
            })
        })
        // verify that the passwords must match
        describe('given the confirmPassword not match password', () => {
            it('should return a 400 and the error message.', async () => {
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    //@ts-ignore
                    .mockReturnValueOnce(userPayload)

                const { body, statusCode } = await request(app)
                    .post('/api/users')
                    .send({
                        ...userInput,
                        passwordConfirmation: 'notmatchpassword!'
                    })

                expect(statusCode).toBe(400)
                expect(createUserServiceMock).not.toHaveBeenCalledWith()


            })
        })
        // verify that the handler handles any errors.

        describe('given the handler throws an error', () => {
            it('should return a 500 and the error message', async () => {
                // mock the create user service
                const createUserServiceMock = jest
                    .spyOn(UserService, 'createUser')
                    // mock rejection value
                    .mockRejectedValueOnce('oh no :(')

                const { body, statusCode } = await request(app)
                    .post('/api/users')
                    .send(userInput)

                expect(statusCode).toBe(409)
                expect(createUserServiceMock).toHaveBeenCalled();
            })
        })
    })

    // create user session
    describe("create user session", () => {
        describe("given the username and password are valid", () => {
            it("should return a signed accessToken & refresh token", async () => {
                jest
                    .spyOn(UserService, "validatePassword")
                    // @ts-ignore
                    .mockReturnValue(userPayload);

                jest
                    .spyOn(SessionService, "createSession")
                    // @ts-ignore
                    .mockReturnValue(sessionPayload);

                const req = {
                    get: () => {
                        return "a user agent";
                    },
                    body: {
                        email: "test@example.com",
                        password: "Password123",
                    },
                };

                const send = jest.fn();

                const res = {
                    send,
                };

                // @ts-ignore
                await createUserSessionHandler(req, res);

                expect(send).toHaveBeenCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String),
                });
            });
        });
    });
})