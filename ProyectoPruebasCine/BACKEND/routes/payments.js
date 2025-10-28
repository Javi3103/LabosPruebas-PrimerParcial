const express = require("express");
const router = express.Router();
const PaymentInfo = require("../models/PaymentInfo");

// Ruta para obtener la información de pago de un usuario
router.get("/paymentinfo/:userId", async (req, res) => {
  try {
    const paymentInfo = await PaymentInfo.findOne({
      userId: req.params.userId,
    });
    if (!paymentInfo) {
      return res
        .status(404)
        .json({ message: "Información de pago no encontrada" });
    }
    res.status(200).json(paymentInfo);
  } catch (err) {
    console.error(err);
    res.status(500).json({message: "Error al obtener la información de pago", error: err.message});
  }
});

// Ruta para actualizar la información de pago de un usuario
router.put("/paymentinfo/:userId", async (req, res) => {
  try {
    const {
      name,
      cardNumber,
      expiryDate,
      cvv,
      billingAddress,
      city,
      postalCode,
    } = req.body;
    const paymentInfo = await PaymentInfo.findOneAndUpdate(
      { userId: req.params.userId },
      { name, cardNumber, expiryDate, cvv, billingAddress, city, postalCode },
      { new: true, upsert: true } // upsert: true crea el documento si no existe
    );
    res
      .status(200)
      .json({ message: "Información de pago actualizada", paymentInfo });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al actualizar la información de pago" });
  }
});

// Ruta para eliminar la información de pago de un usuario
router.delete("/paymentinfo/:userId", async (req, res) => {
  try {
    await PaymentInfo.findOneAndDelete({ userId: req.params.userId });
    res.status(200).json({ message: "Información de pago eliminada" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error al eliminar la información de pago" });
  }
});

module.exports = router;
