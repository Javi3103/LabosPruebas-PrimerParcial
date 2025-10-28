import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarClient from '../components/NavbarClient';
import { useAuth } from '../context/AuthContext';

const PayInfo = () => {
  const { userId } = useAuth();
  const [paymentInfo, setPaymentInfo] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    billingAddress: '',
    city: '',
    postalCode: ''
  });

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/api/payments/paymentinfo/${userId}`)
        .then(response => {
          setPaymentInfo(response.data);
          setFormData({
            name: response.data.name,
            cardNumber: response.data.cardNumber,
            expiryDate: response.data.expiryDate,
            cvv: response.data.cvv,
            billingAddress: response.data.billingAddress,
            city: response.data.city,
            postalCode: response.data.postalCode
          });
        })
        .catch(error => {
          console.error('Error al obtener la información de pago:', error);
        });
    }
  }, [userId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/payments/paymentinfo/${userId}`, formData)
      .then(response => {
        setPaymentInfo(response.data.paymentInfo);
        setEditMode(false);
      })
      .catch(error => {
        console.error('Error al actualizar la información de pago:', error);
      });
  };

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/api/payments/paymentinfo/${userId}`)
      .then(() => {
        setPaymentInfo({});
        setFormData({
          name: '',
          cardNumber: '',
          expiryDate: '',
          cvv: '',
          billingAddress: '',
          city: '',
          postalCode: ''
        });
      })
      .catch(error => {
        console.error('Error al eliminar la información de pago:', error);
      });
  };

  return (
    <div>
      <NavbarClient />
      <div className="container" style={{ marginTop: '30px' }}>
        <h1 className="mb-4">Información de Pago</h1>
        <div className="card">
          <div className="card-body">
            {editMode ? (
              <div>
                <div className="mb-3">
                  <label className="form-label" htmlFor="Name">Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Número de Tarjeta:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Fecha de Expiración:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">CVV:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Dirección de Facturación:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="billingAddress"
                    value={formData.billingAddress}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ciudad:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Código Postal:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                  />
                </div>
                <button className="btn btn-success me-2" onClick={handleSave}>Guardar</button>
                <button className="btn btn-primary me-2" onClick={() => setEditMode(false)}>Cancelar</button>
                
              </div>
            ) : (
              <div>
                <p><strong>Nombre:</strong> {paymentInfo.name}</p>
                <p><strong>Número de Tarjeta:</strong> {paymentInfo.cardNumber}</p>
                <p><strong>Fecha de Expiración:</strong> {paymentInfo.expiryDate}</p>
                <p><strong>CVV:</strong> {paymentInfo.cvv}</p>
                <p><strong>Dirección de Facturación:</strong> {paymentInfo.billingAddress}</p>
                <p><strong>Ciudad:</strong> {paymentInfo.city}</p>
                <p><strong>Código Postal:</strong> {paymentInfo.postalCode}</p>
                <button className="btn btn-warning me-2" onClick={() => setEditMode(true)}>Editar</button>
                <button className="btn btn-danger" onClick={handleDelete}>Eliminar Información</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayInfo;
