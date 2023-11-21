import React, { useEffect, useState } from 'react';
import ActionButton from '../admin/ActionButton';
import CategoriaService from '../../services/CategoriaServices';

const ProductoTable = ({ products, formatCurrency, handleEditProduct, handleDeleteProduct }) => {
     // Agrega un mensaje si no hay categorías

    
    const [categorias, setCategorias] = useState([]);


    useEffect(() => {

        fetchCategorias();

    }, []);

    const fetchCategorias = async () => {
        try {
            const categoriasData = await CategoriaService.getAllCategorias();
            //console.log('Categorias Data:', categoriasData);
            setCategorias(categoriasData);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };


     if (products.length === 0) {
        return <p className='text-center'>No hay productos disponibles.</p>;
    }
    const getNombreCategoria = (categoriaId) => {
        const categoria = categorias.find((cat) => cat.id === categoriaId);
        return categoria ? categoria.nombre : 'Sin categoría';
    };

    
    return (
        <table className="table table-bordered table-striped">
            <thead className="thead-dark">
                <tr>
                    <th>N°</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Talla</th>
                    <th>Color</th>
                    <th>Categoría</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {products.map((product, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{product.nombre}</td>
                        <td>{formatCurrency(product.precio)}</td>
                        <td>{product.talla}</td>
                        <td>{product.color}</td>
                        <td>{getNombreCategoria(product.categoria_id)}</td>
                        <td>
                            <ActionButton
                                actionType="edit"
                                onClick={() => handleEditProduct(product.id)}
                            />
                            <ActionButton
                                actionType="delete"
                                onClick={() => handleDeleteProduct(product.id)}
                            />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default ProductoTable;
