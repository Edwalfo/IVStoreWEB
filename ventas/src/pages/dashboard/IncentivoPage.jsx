import React, { useState, useEffect } from 'react';
import FacturasServices from '../../services/VentaServices';
import SedeServices from '../../services/SedeServices';
import VendedorServices from '../../services/IncentivoServices';
import Histograma from '../../components/admin/HistogramaGrafica'

function IncentivoPage() {
   
    const [ventas, setVentas] = useState([]);
    const [vendedores, setVendedors] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [vendedoresFiltrados, setVendedoresFiltrados] = useState([]);

    const [filtroMeta, setFiltroMeta] = useState('');
    const [filtroCondicion, setFiltroCondicion] = useState('sinFiltro');
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFin, setFechaFin] = useState('');

    useEffect(() => {
        fetchVendedores();
        fetchSedes();
        fetchVentas();
    }, []);

    const fetchVentas = async () => {
        try {
            const ventasData = await FacturasServices.getAllVentas();
            setVentas(ventasData);
        } catch (error) {
            console.error('Error fetching ventas:', error);
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

    const fetchVendedores = async () => {
        try {
            const vendedorData = await VendedorServices.getCountVentas();
            setVendedors(vendedorData);
            setVendedoresFiltrados(vendedorData); // Inicializar vendedoresFiltrados
        } catch (error) {
            console.error('Error fetching vendedor:', error);
        }
    };

    const aplicarFiltro = () => {
        if (fechaInicio > fechaFin) {
            alert('La fecha de inicio debe ser anterior o igual a la fecha de fin.');
            return;
        }

        const vendedoresFiltrados = vendedores.filter((vendedor) => {
            const totalVendedor = vendedor.cantidad_ventas || 0;
            const ventasEnRango = ventas.filter((venta) => {
                return (
                    venta.vendedorId === vendedor.id &&
                    venta.fecha >= fechaInicio &&
                    venta.fecha <= fechaFin
                );
            });

            switch (filtroCondicion) {
                case '<':
                    return totalVendedor < filtroMeta && (ventasEnRango.length > 0 || !fechaInicio || !fechaFin);
                case '<=':
                    return totalVendedor <= filtroMeta && (ventasEnRango.length > 0 || !fechaInicio || !fechaFin);
                case '>=':
                    return totalVendedor >= filtroMeta && (ventasEnRango.length > 0 || !fechaInicio || !fechaFin);
                case '=':
                    return totalVendedor === filtroMeta && (ventasEnRango.length > 0 || !fechaInicio || !fechaFin);
                case 'sinFiltro':
                    return ventasEnRango.length > 0 || !fechaInicio || !fechaFin;
                default:
                    return ventasEnRango.length > 0 || !fechaInicio || !fechaFin;
            }
        });

        setVendedoresFiltrados(vendedoresFiltrados);
    };

    const reiniciarTabla = () => {
        setFiltroMeta('');
        setFiltroCondicion('sinFiltro');
        setFechaInicio('');
        setFechaFin('');
        fetchVendedores();
        fetchSedes();
        fetchVentas();
    };
    return (
        <>
            <div>
                <h1 className="mt-4">Incentivos</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Incentivos</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                    </div>
                    <div className="card-body">


                        <h3>Filtros de Ventas</h3>

                        <div className="row mb-3">
                            <div className="col-lg-3">
                                <label htmlFor="filtroMeta" className="form-label me-2">Meta de Ventas:</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    id="filtroMeta"
                                    value={filtroMeta}
                                    onChange={(e) => setFiltroMeta(e.target.value)}
                                />
                            </div>

                            <div className="col-lg-3">
                                <label htmlFor="filtroCondicion" className="form-label me-2">Tipo de Filtro:</label>
                                <select
                                    className="form-select"
                                    value={filtroCondicion}
                                    onChange={(e) => setFiltroCondicion(e.target.value)}
                                >
                                    <option value="sinFiltro">Sin Filtro</option>
                                    <option value="<">{'<'}</option>
                                    <option value="<=">{'<='}</option>
                                    <option value=">=">{'>='}</option>
                                    <option value="=">{'='}</option>
                                </select>
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="fechaInicio" className="form-label me-2">Fecha de Inicio:</label>
                                <input
                                    type="date"
                                    className="form-control "
                                    id="fechaInicio"
                                    value={fechaInicio}
                                    onChange={(e) => setFechaInicio(e.target.value)}
                                />
                            </div>
                            <div className="col-lg-3">
                                <label htmlFor="fechaFin" className="form-label me-2">Fecha de Fin:</label>
                                <input
                                    type="date"
                                    className="form-control"
                                    id="fechaFin"
                                    value={fechaFin}
                                    onChange={(e) => setFechaFin(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-secondary me-2" onClick={reiniciarTabla}>Reiniciar Filtro</button>
                            <button className="btn btn-primary" onClick={aplicarFiltro}>Aplicar Filtro</button>
                        </div>


                    </div>
                </div>


                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                    </div>
                    <div className="card-body">
                        <h2>Lista de vendedores</h2>
                       <div className="table-responsive">
                       <table className="table table-bordered table-striped">
                            <thead className="thead-dark">
                                <tr>
                                    <th>ID Vendedor</th>
                                    <th>Nombre Vendedor</th>
                                    <th>Total de Ventas</th>
                                    <th>Sede</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendedoresFiltrados.map(vendedor => (
                                    <tr key={vendedor.cedula}>
                                        <td>{vendedor.cedula}</td>
                                        <td>{vendedor.nombre}</td>
                                        <td>{vendedor.cantidad_ventas}</td>
                                        <td>{/* Mostrar el nombre de la sede */}
                                            {sedes.find(sede => sede.id === vendedor.sede_id)?.nombre || 'Sin sede'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                       </div>
                    </div>

                </div>

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-chart-bar me-1"></i> Histograma de Ventas por Usuario
                    </div>
                    <div className="card-body" style={{ width: "auto", height: "400px" }}>
                    <Histograma datos={vendedoresFiltrados} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default IncentivoPage;	