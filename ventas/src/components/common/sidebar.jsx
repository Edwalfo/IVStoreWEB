import { Link } from 'react-router-dom';

function Sidebar() {
    return (
        <>
            <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                <div className="sb-sidenav-menu">
                    <div className="nav">
                        <div className="sb-sidenav-menu-heading">Core</div>

                        <Link className="nav-link" to="/admin" >
                            <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt" ></i></div>
                            Dashboard
                        </Link>
                        <div className="sb-sidenav-menu-heading">Interface</div>

                        <Link className="nav-link " to="/admin/productos" aria-expanded="false" >
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open" ></i></div>
                            Productos
                        </Link>

                        <Link className="nav-link " to="/admin/vendedores" aria-expanded="false" >
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open" ></i></div>
                            Vendedores
                        </Link>

                        <Link className="nav-link " to="/admin/ventas" aria-expanded="false" >
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open" ></i></div>
                            Ventas
                        </Link>
                    
                        <a className="nav-link collapsed" href="#" data-bs-toggle="collapse" data-bs-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                            <div className="sb-nav-link-icon"><i className="fas fa-cogs"></i></div>
                            Configuracion
                            <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                        </a>
                        <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-bs-parent="#sidenavAccordion">
                            <nav className="sb-sidenav-menu-nested nav">

                                <Link className="nav-link " to="/admin/configuracion/sedes" aria-expanded="false" >

                                    Sedes
                                </Link>

                                <Link className="nav-link " to="/admin/configuracion/categorias" aria-expanded="false" >

                                    Categorias
                                </Link>
{/* 
                                <Link className="nav-link " to="/admin/configuracion/usuarios" aria-expanded="false" >

                                    Usuarios
                                </Link> */}

                            </nav>
                        </div>

                        <div className="sb-sidenav-menu-heading">Addons</div>
                        <Link className="nav-link " to="/admin/incentivos" aria-expanded="false">
                            <div className="sb-nav-link-icon"><i className="fas fa-book-open" ></i></div>
                            Incentivos
                        </Link>
                   
                        <Link className="nav-link" to="/admin/historial">
                            <div className="sb-nav-link-icon"><i className="fas fa-chart-area" ></i></div>
                            Historal
                        </Link>

                    </div>
                </div>
                <div className="sb-sidenav-footer">
                    <div className="small">Logged in as:</div>
                    Don Henrry
                </div>
            </nav>


        </>
    );
}

export default Sidebar;