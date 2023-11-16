// SedeModal.js
import React from 'react';

function SedeModal({ showModal, onClose, onAddSede, onUpdateSede, newSede, handleInputChange, isEditMode }) {

 
    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            style={{ display: showModal ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="sedeModal"
            aria-hidden={!showModal}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="sedeModal">
                            {isEditMode ? 'Actualizar Sede' : 'Agregar Sede'}
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
                                    value={newSede.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="departamento" className="form-label">
                                    Departamento
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="departamento"
                                    name="departamento"
                                    value={newSede.departamento}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="ciudad" className="form-label">
                                    Ciudad
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="ciudad"
                                    name="ciudad"
                                    value={newSede.ciudad}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="telefono" className="form-label">
                                    Telefono
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="telefono"
                                    name="telefono"
                                    value={newSede.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="direccion" className="form-label">
                                    Direccion
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="direccion"
                                    name="direccion"
                                    value={newSede.direccion}
                                    onChange={handleInputChange}
                                />
                            </div>

                        
                            <div className="mb-3">
                                <label htmlFor="color" className="form-label">
                                    Color
                                </label>
                                <input
                                    type="color"
                                    className="form-control"
                                    id="color"
                                    name="color"
                                    value={newSede.color}
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
                            onClick={isEditMode ? onUpdateSede : onAddSede}
                        >
                            {isEditMode ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SedeModal;