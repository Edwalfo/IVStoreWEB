// VendedorTable.js
import React, { useEffect, useState } from 'react';
import ActionButton from '../admin/ActionButton';
import SedeServices from '../../services/SedeServices';

const VendedorTable = ({ vendedors, handleEditVendedor, handleDeleteVendedor }) => {


    const [sedes, setSedes] = useState([]);

    useEffect(() => {

        fetchSedes();

    }, []);

    const fetchSedes = async () => {
        try {
            const sedesData = await SedeServices.getAllSedes();
            setSedes(sedesData);
        } catch (error) {
            console.error('Error fetching sedes:', error);
        }
    };


    if (vendedors.length === 0) {
        return <p className='text-center'>No hay datos disponibles.</p>;
    }


    const getNombreSede = (sedeId) => {
        const sede = sedes.find((s) => s.id === sedeId);
        return sede ? sede.nombre : 'Sin sede';
    }
    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>N°</th>
                    <th>Identificacion</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Sede</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {vendedors.map((vendedor, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{vendedor.cedula}</td>
                        <td>{vendedor.nombre}</td>
                        <td>{vendedor.telefono}</td>
                        <td>{getNombreSede(vendedor.sede_id)}</td>
                        <td>
                            <ActionButton
                                actionType="edit"
                                onClick={() => handleEditVendedor(vendedor.cedula)}
                            />
                            <ActionButton
                                actionType="delete"
                                onClick={() => handleDeleteVendedor(vendedor.cedula)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default VendedorTable;
