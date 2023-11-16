// VendedorTable.js
import React from 'react';
import ActionButton from '../admin/ActionButton';

const VendedorTable = ({ vendedors, handleEditVendedor, handleDeleteVendedor }) => {
    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Identificacion</th>
                    <th>Nombre</th>
                    <th>Telefono</th>
                    <th>Sede_id</th>
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
                        <td>{vendedor.sede_id}</td>
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
