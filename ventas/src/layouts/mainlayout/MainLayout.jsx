import { useRoutes, Route, Routes } from 'react-router-dom';
import Nav from '../../components/common/Nav';
import Footer from '../../components/common/Footer';
import DashboardPage from '../../pages/dashboard/DashboardPage';
import SedePage from '../../pages/dashboard/SedePage';
import ProductoPage from '../../pages/dashboard/ProductoPage';
import UsuarioPage from '../../pages/dashboard/UsuarioPage';
import IncentivoPage from '../../pages/dashboard/IncentivoPage';
import CategoriaPage from '../../pages/dashboard/CategoriaPage';
import VendedorPage from '../../pages/dashboard/VendedorPage';
import HistorialPage from '../../pages/dashboard/HistorialPage';
import Sidebar from '../../components/common/Sidebar';
import VentaPage from '../../pages/dashboard/VentaPage';




function MainLayout() {

    const contentRoutes = useRoutes([
        { index: true, element: <DashboardPage /> }, // Ruta por defecto
        { path: 'dashboard', element: <DashboardPage /> },
        { path: 'productos', element: <ProductoPage /> },
        { path: 'vendedores', element: <VendedorPage /> },
        { path: 'Ventas', element: <VentaPage /> },
        { path: 'Incentivos', element: <IncentivoPage /> },
        { path: 'historial', element: <HistorialPage /> },
        { path: 'configuracion/categorias', element: <CategoriaPage /> },
        // { path: 'configuracion/usuarios', element: <UsuarioPage /> },
        { path: 'configuracion/sedes', element: <SedePage /> },

        //Agregar más rutas secundarias según tus necesidades
        { path: '*', element: <DashboardPage /> }, // Mostrar children si no coincide con ninguna subruta
    ]);

    return (
        <>
            <Nav />
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                    <Sidebar></Sidebar>
                </div>
                <div id="layoutSidenav_content">
                    <main>
                        <div className="container-fluid px-4">
                            {contentRoutes}
                        </div>
                    </main>
                    <Footer />
                </div>
            </div>
        </>
    );
}



export default MainLayout;