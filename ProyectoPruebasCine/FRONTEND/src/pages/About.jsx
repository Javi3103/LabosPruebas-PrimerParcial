import React from 'react';
import Navbar from '../components/Navbar';
import teamImage from '../assets/cinestar.png'; // Importa una imagen de equipo como ejemplo

const About = () => {
    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '30px' }}>
                <div className="row">
                    <div className="col-md-8">
                        <h1>Acerca de CineStar</h1>
                        <p className="lead">
                            Bienvenido a CineStar, tu mejor opción para disfrutar del cine en la ciudad. Nos dedicamos a ofrecerte la mejor experiencia cinematográfica.
                        </p>
                        <p>
                            En CineStar, nos esforzamos por proporcionar un entorno acogedor y confortable donde puedas disfrutar de las mejores películas. Desde los últimos estrenos hasta los clásicos de siempre, tenemos algo para todos.
                        </p>
                        <h3>Nuestra Historia</h3>
                        <p>
                            CineStar fue fundado en 2005 con la misión de crear un espacio donde los amantes del cine pudieran disfrutar de sus películas favoritas en la mejor calidad posible. Con el tiempo, hemos crecido y mejorado nuestras instalaciones para ofrecer una experiencia de cine de primera clase.
                        </p>
                        <h3>Nuestra Misión</h3>
                        <p>
                            Nuestra misión es brindar una experiencia cinematográfica única y memorable. Nos comprometemos a ofrecer un servicio excepcional y un ambiente acogedor para todos nuestros visitantes. Creemos que el cine es un arte y estamos aquí para celebrarlo.
                        </p>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <img src="https://media.istockphoto.com/id/1458634098/es/foto/asistente-entregando-palomitas-de-ma%C3%ADz-y-refrescos.jpg?s=612x612&w=0&k=20&c=G4uxqXLLy63IMtn8jDC4lHLYGW09NZcCt35Qsavd8HQ=" className="card-img-top" alt="Nuestro Equipo" />
                            <div className="card-body">
                                <h5 className="card-title">Nuestro Equipo</h5>
                                <p className="card-text">
                                    Conoce al apasionado equipo detrás de CineStar. Cada miembro de nuestro equipo está dedicado a asegurarse de que tu experiencia en el cine sea la mejor posible.
                                </p>
                            </div>
                        </div>
                        <div className="card my-3">
                            <div className="card-body">
                                <h5 className="card-title">Testimonios de Clientes</h5>
                                <p className="card-text">
                                    "CineStar tiene los mejores asientos de la ciudad. ¡Siempre disfruto de mis noches de cine aquí!"
                                    <br />
                                    <em>- Juan Pérez</em>
                                </p>
                                <p className="card-text">
                                    "¡Gran experiencia! El personal es amable y las palomitas son increíbles."
                                    <br />
                                    <em>- María López</em>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;
