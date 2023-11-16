// VentaTable.js
import React from 'react';
import ActionButton from '../admin/ActionButton';

const VentaTable = ({ ventas, formatCurrency, handleEditVenta, handleDeleteVenta }) => {
    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Fecha</th>
                    <th>Total</th>
                    <th>Sede_id</th>
                    <th>Empleado_cedula</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {ventas.map((venta, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{new Date(venta.fecha).toLocaleDateString()}</td>
                        <td>{formatCurrency(venta.total)}</td>
                        <td>{venta.sede_id}</td>
                        <td>{venta.empleado_cedula}</td>
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
