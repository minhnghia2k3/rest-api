import request from 'supertest';
import createServer from '../utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';
import { createProduct } from '../service/product.service';
import { signJwt } from '../utils/jwt.utils';

const app = createServer();
const userId = new mongoose.Types.ObjectId().toString(); // Generate a random user ID.

const productPayload = {
    "user": userId,
    "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
    "description": "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
    "price": 879.99,
    "image": "https://i.imgur.com/QlRphfQ.jpg"
}

const userPayload = {
    _id: userId,
    email: "test@example.com",
    // password: "Password456!",
    // passwordConfirmation: "Password456!",
    name: "John Doe"
}

// Parent Describe block
describe('Product', () => {
    // In-memory version of MongoDB
    beforeAll(async () => {
        const mongod = await MongoMemoryServer.create();
        const uri = mongod.getUri();
        mongoose.connect(uri)
    })

    afterAll(async () => {
        mongoose.disconnect();
        mongoose.connection.close();
    })
    // #1. Child route block
    describe('get product route', () => {
        // 2. Condition block
        describe('given the product doesnt exit', () => {
            it('should return a 404 error.', async () => {
                const productId = 'product-123'
                await request(app).get(`/api/products/${productId}`).expect(404)
            })
        })
        describe('given the product that exists', () => {
            it('should return a 200 status code and product.', async () => {
                const product = await createProduct(productPayload)
                await request(app)
                    .get(`/api/products/${product.productId}`)
                    .expect(200)
                    .expect((response) => {
                        expect(response.body.data.productId).toBe(product.productId)
                    })
            })
        })

    })
    describe('create product route', () => {

        describe('given the user is not logged in', () => {
            it('should return a 403 error.', async () => {
                await request(app)
                    .post('/api/products')
                    .send(productPayload)
                    .expect(403)
            })
        })
        describe('given the user is logged in', () => {
            it('should return 201 and the product.', async () => {
                const jwt = signJwt(userPayload)
                await request(app)
                    .post('/api/products')
                    .set('Authorization', `Bearer ${jwt}`)
                    .send(productPayload)
                    .expect(201)
                    .then((response) => {
                        return expect(response.body.data).toEqual({
                            "__v": 0,
                            "_id": expect.any(String),
                            "createdAt": expect.any(String),
                            "description": expect.any(String),
                            "image": "https://i.imgur.com/QlRphfQ.jpg",
                            "price": 879.99,
                            "productId": expect.any(String),
                            "title": "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
                            "updatedAt": expect.any(String),
                            "user": expect.any(String),
                        })
                    })
            })
        })
    })
})