const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const usersRouter = require("../routes/users");
const User = require("../models/User");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api", usersRouter);

beforeAll(async () => {
    await mongoose.connect("mongodb://localhost:27017/Test", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
});

beforeEach(async () => {
    await User.deleteMany({});

    // Usuario existente
    await User.create({
        username: "existinguser",
        email: "existing@example.com",
        password: process.env.password,
        firstName: "Existing",
        lastName: "User",
        role: "client",
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe("Validación de entradas", () => {

    // Test de validación de contraseñas
    test("Debe retornar 400 si las contraseñas no coinciden", async () => {
        const response = await request(app).post("/api/register").send({
            username: "john_doe",
            email: "johndue@example.com",
            password: "1234",
            confirmPassword: "5678",
            firstName: "John",
            lastName: "Due",
            role: "client",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe("Las contraseñas no coinciden");
    });

    // Tets de validación de correo electrónico
    test("Debe retornar 400 si el email ya existe", async () => {
        const response = await request(app).post("/api/register").send({
            username: "john_doe",
            email: "existing@example.com",
            password: "1234",
            confirmPassword: "1234",
            firstName: "John",
            lastName: "Due",
            role: "client",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(
            "El correo electrónico ya está registrado"
        );
    });

    // test de validación de nombre de usuario
    test("Debe retornar 400 si el nombre de usuario ya existe", async () => {
        const response = await request(app).post("/api/register").send({
            username: "existinguser",
            email: "existing@example.com",
            password: "1234",
            confirmPassword: "1234",
            firstName: "John",
            lastName: "Due",
            role: "client",
        });
        expect(response.statusCode).toBe(400);
        expect(response.body.message).toBe(
            "El nombre de usuario ya está registrado"
        );
    });
});
