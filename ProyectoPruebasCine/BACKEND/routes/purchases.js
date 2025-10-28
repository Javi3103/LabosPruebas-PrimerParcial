const express = require('express');
const router = express.Router();
const Purchase = require('../models/Purchase');
const PaymentInfo = require('../models/PaymentInfo');

// Ruta para registrar una compra
router.post('/comprar', async (req, res) => {
    try {
        const { userId, movie, quantity, selectedSeats, total, time, savePaymentInfo, paymentInfo } = req.body;

        // Crear una nueva compra
        const purchase = await Purchase.create({
            userId,
            movie,
            quantity,
            selectedSeats,
            total,
            time
        });

        // Si el usuario quiere guardar la información de pago
        if (savePaymentInfo) {
            await PaymentInfo.findOneAndUpdate(
                { userId },
                { $set: paymentInfo },
                { upsert: true, new: true }  // upsert: crea si no existe, new: devuelve el documento actualizado
            );
        }

        res.status(201).json({ message: 'Compra registrada con éxito', purchase });
    } catch (error) {
        console.error('Error al registrar la compra:', error);
        res.status(500).json({ message: 'Error al registrar la compra' });
    }
});

// Ruta para obtener todas las compras
router.get('/compras', async (req, res) => {
    try {
        const purchases = await Purchase.find({});
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener todas las compras:', error);
        res.status(500).json({ message: 'Error al obtener todas las compras' });
    }
});

// Ruta para obtener las compras de un usuario
router.get('/compras/:userId', async (req, res) => {
    try {
        const { userId } = req.params;
        const purchases = await Purchase.find({ userId });
        res.status(200).json(purchases);
    } catch (error) {
        console.error('Error al obtener las compras:', error);
        res.status(500).json({ message: 'Error al obtener las compras' });
    }
});

module.exports = router;
