import supertest from 'supertest';
import createServer from '../utils/server';
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose';
const app = createServer();

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
        describe('given the product does not exists', () => {
            it('should return a 404 error.', async () => {
                const productId = 'product-123'
                await supertest(app).get(`/api/products/${productId}`).expect(404)
            })
        })
    })
})