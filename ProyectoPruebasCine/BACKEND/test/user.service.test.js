const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const usersRouter = require("../routes/users");

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

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe("API de Usuarios", () => {
    let testUserId;

    // Test de registro de usuario
    test("Debe registrar un nuevo usuario", async () => {
        const response = await request(app).post("/api/register").send({
            username: "testuser",
            email: "testuser@example.com",
            password: "password123",
            confirmPassword: "password123",
            firstName: "Test",
            lastName: "User",
            role: "client",
        });
        console.log(response.body.user._id);
        console.log(response.body);
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe("Registro exitoso");
        testUserId = response.body.user._id;
    });

    // Test de inicio de sesión
    test("Debe iniciar sesión el usuario", async () => {
        const response = await request(app).post("/api/login").send({
            emailOrUsername: "testuser@example.com",
            password: "password123",
        });
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Inicio de sesión exitoso");
    });

    // Test de Obtener todos los usuarios
    test("Debe obtener todos los usuarios", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Origin", "http://localhost:5173");
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeInstanceOf(Array);
    });

    // Test de Obtener un usuario por Id
    test("Debe obtener un usuario por Id", async () => {
        const response = await request(app)
            .get(`/api/users/${testUserId}`)
            .set("Origin", "http://localhost:5173");
        expect(response.statusCode).toBe(200);
        expect(response.body.username).toBe("testuser");
    });

    // Test de Actualizar usuario
    test("Debe actualizar un usuario", async () => {
        const response = await request(app).put(`/api/users/${testUserId}`).send({
            username: "updateduser",
            email: "updateduser@example.com",
            password: "newpassword123",
            firstName: "Updated",
            lastName: "User",
        });
        console.log(response.body);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Usuario actualizado");
        expect(response.body.user.username).toBe("updateduser");
    });

    // Test de Eliminar usuario
    test("Debe eliminar el usuario", async () => {
        const response = await request(app).delete(`/api/users/${testUserId}`);
        expect(response.statusCode).toBe(200);
        expect(response.body.message).toBe("Usuario eliminado");
    });
});
