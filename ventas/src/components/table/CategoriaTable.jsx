import React from 'react';
import ActionButton from '../admin/ActionButton';

const CategoriaTable = ({ categorias, handleEditCategoria, handleDeleteCategoria }) => {
    // Agrega un mensaje si no hay categorías
    if (categorias.length === 0) {
        return <p className='text-center'>No hay categorías disponibles.</p>;
    }

    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {categorias.map((categoria, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{categoria.nombre}</td>
                        <td>
                            <ActionButton
                                actionType="edit"
                                onClick={() => handleEditCategoria(categoria.id)}
                            />
                            <ActionButton
                                actionType="delete"
                                onClick={() => handleDeleteCategoria(categoria.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CategoriaTable;