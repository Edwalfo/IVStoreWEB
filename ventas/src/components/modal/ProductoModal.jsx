
import React, { useEffect, useState } from 'react';
import CategoriaService from '../../services/CategoriaServices';
function ProductoModal({ showModal, onClose, onAddProduct, onUpdateProduct, newProduct, handleInputChange, isEditMode }) {

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




    const handlePriceChange = (e) => {
        const { name, value } = e.target;
        // Validar que el precio sea un número positivo antes de actualizar el estado
        if (name === 'precio' && parseFloat(value) < 0) {
            // Puedes mostrar una alerta o mensaje de error aquí
            return;
        }
        handleInputChange(e);
    };

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            style={{ display: showModal ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="productoModal"
            aria-hidden={!showModal}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="productoModal">
                            {isEditMode ? 'Actualizar Producto' : 'Agregar Producto'}
                        </h5>
                        <button
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                            onClick={onClose}
                        ></button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="nombre" className="form-label">
                                    Nombre
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="nombre"
                                    name="nombre"
                                    value={newProduct.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="precio" className="form-label">
                                    Precio
                                </label>
                                <div className="input-group">
                                    <span className="input-group-text">$</span>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="precio"
                                        name="precio"
                                        value={newProduct.precio}
                                        onChange={handlePriceChange}
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="talla" className="form-label">
                                    Talla
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="talla"
                                    name="talla"
                                    value={newProduct.talla}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="color" className="form-label">
                                    Color
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="color"
                                    name="color"
                                    value={newProduct.color}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="categoria_id" className="form-label">
                                    Categoría
                                </label>
                                <select
                                    className="form-select"
                                    id="categoria_id"
                                    name="categoria_id"
                                    value={newProduct.categoria_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="" >Selecciona una categoría</option>
                                    {categorias.map((categoria) => (
                                        <option key={categoria.id} value={categoria.id}>
                                            {categoria.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-bs-dismiss="modal"
                            onClick={onClose}
                        >
                            Cerrar
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={isEditMode ? onUpdateProduct : onAddProduct}
                        >
                            {isEditMode ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductoModal;