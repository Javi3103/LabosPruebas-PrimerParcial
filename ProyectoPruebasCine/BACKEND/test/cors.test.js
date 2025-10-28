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
        useUnifiedTopology: true,
    });
});

afterAll(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
});

describe("API de Usuarios", () => {
    // CORS permitido
    test("Debe permitir solicitudes de http://localhost:5173", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Origin", "http://localhost:5173");
        expect(response.statusCode).toBe(200);
    });

    // CORS bloqueado
    test("Debe bloquear solicitudes de diferentes origenes", async () => {
        const response = await request(app)
            .get("/api/users")
            .set("Origin", "http://localhost:9999");
        expect(response.statusCode).toBe(403);
    });
});
