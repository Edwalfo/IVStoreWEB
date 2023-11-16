import React, { useState, useEffect } from 'react';
import FacturasServices from '../../services/VentaServices';
import SedeServices from '../../services/SedeServices';
import ProductoServices from '../../services/ProductoServices';
import PieGrafica from '../../components/admin/PieGrafica'

const HistorialPage = () => {

    const [sedes, setSedes] = useState([]);
    const [items, setItems] = useState([]);

    const [facturas, setFacturas] = useState([]);
    const [productos, setProductos] = useState([]);

    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {

        fetchSedes();
        fetchFacturas();
        fetchProductos();


    }, [facturas]);

    const fetchProductos = async () => {
        try {
            const productosData = await ProductoServices.getAllProductos();
            setProductos(productosData);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const fetchFacturas = async () => {
        try {
            const ventasData = await FacturasServices.getAllVentas();
            setFacturas(ventasData);

            //Agregar los items
            setItems(ventasData.flatMap((element => element.items)))
        } catch (error) {
            console.error('Error fetching facturas:', error);
        }
    };

    const fetchSedes = async () => {
        try {
            const sedesData = await SedeServices.getAllSedes();
            setSedes(sedesData);
        } catch (error) {
            console.error('Error fetching sedes:', error);
        }
    };



    const contarVentasPorSede = (sede_id) => {

        const facturasSede = facturas.filter(
            (factura) => factura.sede_id === sede_id && filtrarPorFecha(factura.fecha)
        );
        return facturasSede.length;
    };

    const calcularTotalFormatoColombiano = (items) => {
        const total = items.reduce((accum, item) => accum + parseFloat(item.total), 0);
    
        const formatoColombiano = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        });
    
        return formatoColombiano.format(total);
    };
    
    const calcularCostoTotalVentas = (sede_id) => {
        const facturasSede = facturas.filter(
            (factura) => factura.sede_id === sede_id && filtrarPorFecha(factura.fecha)
        );
    
        return calcularTotalFormatoColombiano(facturasSede);
    };
    
    const calcularSumaVentas = () => {
        const ventasFiltradas = facturas.filter((factura) => filtrarPorFecha(factura.fecha));
    
        if (fechaInicio && fechaFin) {
            // Si se han seleccionado fechas
            return `Suma total de ventas (en el período seleccionado): ${calcularTotalFormatoColombiano(ventasFiltradas)}`;
        } else {
            // Si no se han seleccionado fechas
            return 'Seleccione un rango de fechas para ver la suma total de ventas.';
        }
    };

    // Función para calcular el producto más vendido en cada sede
    const calcularProductoMasVendido = (sede_id) => {
        const facturasSede = facturas.filter(
            (factura) => factura.sede_id === sede_id && filtrarPorFecha(factura.fecha)
        );

        const itemsSede = items.filter(
            (item) => facturasSede.some((factura) => factura.id === item.factura_id)
        );

        const productosVendidos = {};
        itemsSede.forEach((item) => {
            const producto = productos.find((p) => p.id === item.producto_id);
            if (producto) {
                if (productosVendidos[producto.nombre]) {
                    productosVendidos[producto.nombre] += item.cantidad;
                } else {
                    productosVendidos[producto.nombre] = item.cantidad;
                }
            }
        });

        const productosOrdenados = Object.entries(productosVendidos).sort(
            (a, b) => b[1] - a[1]
        );

        if (productosOrdenados.length > 0) {
            return productosOrdenados[0][0]; // Nombre del producto más vendido
        } else {
            return 'No tiene ventas'; // No hay productos vendidos
        }
    };



    const handleFechaInicioChange = (e) => {
        setFechaInicio(e.target.value);
    };

    const handleFechaFinChange = (e) => {
        setFechaFin(e.target.value);
    };

    const filtrarPorFecha = (facturaFecha) => {
        if (!fechaInicio || !fechaFin) {
            return true; // No se aplican filtros si las fechas no están especificadas
        }

        return facturaFecha >= fechaInicio && facturaFecha <= fechaFin;
    };

    const limpiarFiltros = () => {
        setFechaInicio('');
        setFechaFin('');
    };



    // Calcular el volumen total de ventas (aplicando el filtro de fechas)
    const volumenTotalVentas = facturas
        .filter((factura) => filtrarPorFecha(factura.fecha))
        .reduce((total, factura) => total + parseFloat(factura.total), 0);

    // Calcular el porcentaje de ventas para cada sede (aplicando el filtro de fechas)
    const porcentajesVentasPorSede = sedes.map((sede) => {
        const volumenVentasSede = facturas
            .filter((factura) => factura.sede_id === sede.id && filtrarPorFecha(factura.fecha))
            .reduce((total, factura) => total + parseFloat(factura.total), 0);
        const porcentaje = (volumenVentasSede / volumenTotalVentas) * 100;

        return {
            sedeNombre: sede.nombre,
            color: sede.color,
            porcentaje,
        };
    });


    return (
        <div>
            <h1 className="mt-4">Historial de ventas</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Historial de ventas</li>
            </ol>

            <div className="card mb-4">
                <div className="card-header">
                    <i className="fas fa-table me-1"></i>

                </div>
                <div className="card-body">



                    <div className="card mb-4">
                        <div className="card-body">
                            <h3>Resumen de Ventas</h3>
                            <p>Suma total de ventas (en el período seleccionado): {calcularSumaVentas()}</p>
                        </div>
                    </div>
                    <h3>Filtros</h3>

                    <div className="row mb-3">
                        <div className="col-md-3">
                            <label htmlFor="fechaInicio" className="form-label">
                                Fecha de Inicio
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechaInicio"
                                value={fechaInicio}
                                onChange={handleFechaInicioChange}
                            />
                        </div>
                        <div className="col-md-3">
                            <label htmlFor="fechaFin" className="form-label">
                                Fecha de Fin
                            </label>
                            <input
                                type="date"
                                className="form-control"
                                id="fechaFin"
                                value={fechaFin}
                                onChange={handleFechaFinChange}
                            />
                        </div>

                    </div>


                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={limpiarFiltros}
                    >
                        Limpiar Filtros
                    </button>



                </div>
            </div>
            <div className="card mb-4">
                <div className="card-body">
                    <h3>Listado de Sedes</h3>
                    <div className='table-responsive'>
                        <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID</th>
                                    <th>Nombre</th>
                                    <th>Color</th>
                                    <th>Numero de ventas</th>
                                    <th>Volumen de Ventas</th>
                                    <th>Producto mas vendido</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sedes.map((sede) => (
                                    <tr key={sede.id}>
                                        <td>{sede.id}</td>
                                        <td>{sede.nombre}</td>
                                        <td>
                                            <div
                                                style={{
                                                    width: '20px',
                                                    height: '20px',
                                                    backgroundColor: sede.color,
                                                }}
                                            ></div>
                                        </td>
                                        <td>{contarVentasPorSede(sede.id)}</td>
                                        <td>{calcularCostoTotalVentas(sede.id)}</td>
                                        <td>{calcularProductoMasVendido(sede.id)}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="card mb-4">
                        <div className="card-body" >
                            <h3>Gráfico de Porcentaje de Ventas por Sede</h3>

                            <div className="card-body" style={{ width: "auto", height: "400px" }}>
                                <PieGrafica datosPorSede={porcentajesVentasPorSede} />
                            </div>



                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default HistorialPage;