import React from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <div>
            <Navbar />
            <div className="container" style={{ marginTop: '30px' }}>
                <div className="row">
                    <div className="col-md-8">
                        <h1>¡Bienvenido a CineStar!</h1>
                        <p className="lead">
                            Explora nuestra cartelera de películas
                        </p>
                        <Link to="/cartelera" className="btn btn-warning btn-lg">
                            Ver cartelera
                        </Link>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Hora de apertura</h5>
                                <p className="card-text">
                                    Lunes - viernes: 8am - 12pm
                                    <br />
                                    Sábado - domingo: 8am - 12am
                                </p>
                            </div>
                        </div>
                        <div className="card mt-3">
                            <div className="card-body">
                                <h5 className="card-title">Puedes contactarnos</h5>
                                <p className="card-text">
                                    E-mail: cinestar@yourcinema.com
                                    <br />
                                    Teléfono: +593987456306
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Promociones */}
                <div className="row mt-5">
                    <div className="col-md-12">
                        <h2>Promociones</h2>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">2x1 en boletos</h5>
                                <p className="card-text">Todos los martes disfruta de nuestra promoción 2x1 en boletos para todas las funciones.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Descuento para estudiantes</h5>
                                <p className="card-text">Presenta tu credencial de estudiante y obtén un 15% de descuento en tu boleto.</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Combo familiar</h5>
                                <p className="card-text">Aprovecha nuestro combo familiar con descuentos en boletos y snacks.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Reseñas de Clientes */}
                <div className="row mt-5">
                    <div className="col-md-12">
                        <h2>Reseñas de Clientes</h2>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Juan Pérez</h5>
                                <p className="card-text">"La mejor experiencia cinematográfica. ¡Definitivamente regresaré!"</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">María López</h5>
                                <p className="card-text">"Excelentes promociones y muy buen servicio."</p>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card">
                            <div className="card-body">
                                <h5 className="card-title">Carlos García</h5>
                                <p className="card-text">"Gran variedad de películas y salas muy cómodas."</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sección de Galería de Imágenes */}
                <div className="row mt-5">
                    <div className="col-md-12">
                        <h2>Galería</h2>
                    </div>
                    <div className="col-md-3">
                        <img src="https://images.pagina12.com.ar/styles/focal_3_2_960x640/public/2023-06/734326-salacine.jpg?h=10d202d3&itok=nYoPJgI7" alt="Imagen 1" className="img-fluid mb-3"/>
                    </div>
                    <div className="col-md-3">
                        <img src="https://www.shutterstock.com/image-photo/lancaster-california-usa-march-25th-600nw-2446288647.jpg" alt="Imagen 2" className="img-fluid mb-3"/>
                    </div>
                    <div className="col-md-3">
                        <img src="https://decoradosmoya.es/wp-content/uploads/XFIUC644QZAIXPLCLOOMQ3LTWY.jpg" alt="Imagen 3" className="img-fluid mb-3"/>
                    </div>
                    <div className="col-md-3">
                        <img src="https://www.bbva.com/wp-content/uploads/2018/06/Cinemark_Arg_Nig_BBVAFrances03.jpg.jpg" alt="Imagen 4" className="img-fluid mb-3"/>
                    </div>
                </div>
            </div>

            
        </div>
    );
};

export default Home;



