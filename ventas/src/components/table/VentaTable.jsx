// VentaTable.js
import React, { useEffect, useState } from 'react';
import ActionButton from '../admin/ActionButton';
import SedeServices from '../../services/SedeServices';
import VendedorServices from '../../services/VendedorServices';

const VentaTable = ({ ventas, formatCurrency, handleEditVenta, handleDeleteVenta }) => {



    const [vendedores, setVendedors] = useState([]);
    const [sedes, setSedes] = useState([]);

    useEffect(() => {

        fetchSedes();
        fetchVendedores();

    }, []);

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
            const vendedorData = await VendedorServices.getAllVendedors();
            setVendedors(vendedorData);
        } catch (error) {
            console.error('Error fetching vendedor:', error);
        }
    };

 
    if (ventas.length === 0) {
        return <p className='text-center'>No hay ventas disponibles.</p>;
    }

   

    const getNombreSede = (sedeId) => {
        const sede = sedes.find((s) => s.id === sedeId);
        return sede? sede.nombre : 'Sin sede';
    }

    const getNombreVendedor = (vendedorId) => {
        const vendedor = vendedores.find((v) => v.cedula === vendedorId);
        return vendedor? vendedor.nombre : 'Sin dato';
    }




    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>N°</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Sede</th>
                    <th>Empleado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ventas.map((venta, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                        <td>{formatCurrency(venta.total)}</td>
                        <td>{getNombreSede(venta.sede_id)}</td>
                        <td>{getNombreVendedor(venta.empleado_cedula)}</td>
                        <td>
                            <ActionButton
                                actionType="edit"
                                onClick={() => handleEditVenta(venta.id)}
                            />
                            <ActionButton
                                actionType="delete"
                                onClick={() => handleDeleteVenta(venta.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VentaTable;
