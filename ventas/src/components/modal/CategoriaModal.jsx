// CategoriaModal.js
import React from 'react';

function CategoriaModal({ showModal, onClose, onAddCategoria, onUpdateCategoria, newCategoria, handleInputChange, isEditMode }) {
  
    
    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            style={{ display: showModal ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="categoriaModal"
            aria-hidden={!showModal}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="categoriaModal">
                            {isEditMode ? 'Actualizar Categoria' : 'Agregar Categoria'}
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
                                    value={newCategoria.nombre}
                                    onChange={handleInputChange}
                                />
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
                            onClick={isEditMode ? onUpdateCategoria: onAddCategoria}
                        >
                            {isEditMode ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CategoriaModal;