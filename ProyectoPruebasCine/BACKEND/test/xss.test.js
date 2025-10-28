const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("../routes/users");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usersRouter);

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/Test", {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe("Protección XSS", () => {
    test("No se deben permitir scripts en el username", async () => {
        const response = await request(app).post("/api/register").send({
                username: '<script>alert("XSS")</script>',
                email: "xss@example.com",
                password: "password123",
                confirmPassword: "password123",
                firstName: "XSS",
                lastName: "Test",
                role: "client"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.user.username).not.toBe('<script>alert("XSS")</script>');
        expect(response.body.user.username).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
    });

    test("No se deben permitir scripts en el email", async () => {
        const response = await request(app).post("/api/register").send({
                username: "xsstest",
                email: '<script>alert("XSS")</script>@example.com',
                password: "password123",
                confirmPassword: "password123",
                firstName: "XSS",
                lastName: "Test",
                role: "client"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.user.email).not.toBe('<script>alert("XSS")</script>@example.com');
        expect(response.body.user.email).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;@example.com');
    });

    test("No se deben permitir scripts en el nombre", async () => {
        const response = await request(app).post("/api/register").send({
                username: "xsstest",
                email: "xss@example.com",
                password: "password",
                confirmPassword: "password",
                firstName: '<script>alert("XSS")</script>',
                lastName: "Test",
                role: "client"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.user.firstName).not.toBe('<script>alert("XSS")</script>');
        expect(response.body.user.firstName).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
    });

    test("No se deben permitir scripts en el apellido", async () => {
        const response = await request(app).post("/api/register").send({
                username: "xsstest",
                email: "xss@example.com",
                password: "password",
                confirmPassword: "password",
                firstName: "XSS",
                lastName: '<script>alert("XSS")</script>',
                role: "client"
            });
        expect(response.statusCode).toBe(201);
        expect(response.body.user.lastName).not.toBe('<script>alert("XSS")</script>');
        expect(response.body.user.lastName).toBe('&lt;script&gt;alert("XSS")&lt;/script&gt;');
    });
});