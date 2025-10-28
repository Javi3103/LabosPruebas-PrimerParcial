import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarClient from '../components/NavbarClient';
import { useAuth } from '../context/AuthContext';
import { Card, Container, Row, Col } from 'react-bootstrap';

const BuysClient = () => {
    const [purchases, setPurchases] = useState([]);
    const { userId } = useAuth();

    useEffect(() => {
        if (userId) {
            axios.get(`http://localhost:5000/api/purchases/compras/${userId}`)
                .then(response => {
                    setPurchases(response.data);
                })
                .catch(error => {
                    console.error('Error al obtener las compras:', error);
                });
        }
    }, [userId]);

    return (
        <div>
            <NavbarClient />
            <Container style={{ marginTop: '30px' }}>
                <h1 className="text-center">Compras</h1>
                <Row>
                    {purchases.map(purchase => (
                        <Col md={6} lg={4} key={purchase._id} className="mb-4">
                            <Card>
                                <Card.Body>
                                    <Card.Title>Película: {purchase.movie}</Card.Title>
                                    <Card.Text>
                                        <b>Cantidad:</b> {purchase.quantity}<br />
                                        <b>Asientos seleccionados:</b> {purchase.selectedSeats.join(', ')}<br />
                                        <b>Total:</b> ${purchase.total}<br />
                                        <b>Hora:</b> {purchase.time}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
}

export default BuysClient;
