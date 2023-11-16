import React, { useEffect, useState } from 'react';
import SedeService from '../../services/SedeServices'; // Import the SedeService

function VendedorModal({
    showModal,
    onClose,
    onAddVendedor,
    onUpdateVendedor,
    newVendedor,
    handleInputChange,
    isEditMode,
}) {
    const [sedes, setSedes] = useState([]);

    useEffect(() => {
        fetchSedes();
    }, []);

    const fetchSedes = async () => {
        try {
            const sedesData = await SedeService.getAllSedes();
            setSedes(sedesData);
        } catch (error) {
            console.error('Error fetching sedes:', error);
        }
    };

    return (
        <div
            className={`modal fade ${showModal ? 'show' : ''}`}
            style={{ display: showModal ? 'block' : 'none' }}
            tabIndex="-1"
            role="dialog"
            aria-labelledby="vendedorModal"
            aria-hidden={!showModal}
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="vendedorModal">
                            {isEditMode ? 'Actualizar Vendedor' : 'Agregar Vendedor'}
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
                                    value={newVendedor.nombre}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="cedula" className="form-label">
                                    Identificacion
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="cedula"
                                    name="cedula"
                                    value={newVendedor.cedula}
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
                                    value={newVendedor.telefono}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="sede_id" className="form-label">
                                    Sede
                                </label>
                                <select
                                    className="form-select"
                                    id="sede_id"
                                    name="sede_id"
                                    value={newVendedor.sede_id}
                                    onChange={handleInputChange}
                                >
                                    <option value="">
                                        Selecciona una sede
                                    </option>
                                    {sedes.map((sede) => (
                                        <option key={sede.id} value={sede.id}>
                                            {sede.nombre}
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
                            onClick={isEditMode ? onUpdateVendedor : onAddVendedor}
                        >
                            {isEditMode ? 'Actualizar' : 'Agregar'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VendedorModal;