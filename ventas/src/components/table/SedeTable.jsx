// SedeTable.js
import React from 'react';
import ActionButton from '../admin/ActionButton';

const SedeTable = ({ sedes, handleEditSede, handleDeleteSede }) => {
 // Agrega un mensaje si no hay categorías
 if (sedes.length === 0) {
    return <p className='text-center'>No hay sedes disponibles.</p>;
}

    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Departamento</th>
                    <th>Ciudad</th>
                    <th>Telefono</th>
                    <th>Direccion</th>
                    <th>Color</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {sedes.map((sede, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{sede.nombre}</td>
                        <td>{sede.departamento}</td>
                        <td>{sede.ciudad}</td>
                        <td>{sede.telefono}</td>
                        <td>{sede.direccion}</td>
                        <td>
                            <div
                                style={{
                                    width: '20px',
                                    height: '20px',
                                    backgroundColor: sede.color,
                                }}
                            ></div>
                        </td>
                      
                        <td>
                            <ActionButton
                                actionType="edit"
                                onClick={() => handleEditSede(sede.id)}
                            />
                            <ActionButton
                                actionType="delete"
                                onClick={() => handleDeleteSede(sede.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default SedeTable;
