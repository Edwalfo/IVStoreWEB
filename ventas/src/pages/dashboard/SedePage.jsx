// SedePage.js
import React, { useEffect, useState } from 'react';
import SedeModal from '../../components/modal/SedeModal';
import SedeTable from '../../components/table/sedeTable';
import SedeService from '../../services/SedeServices';

function SedePage() {
    const [sedes, setSedes] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newSede, setNewSede] = useState({
        nombre: '',
        departamento: '',
        ciudad: '',
        direccion: '',
        telefono: '',
        color: '',
    });

    const [selectedSedeId, setSelectedSedeId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Al cargar el componente, obtén todas las sedes
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

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSede((prevSede) => ({
            ...prevSede,
            [name]: value,
        }));
    };

    const resetNewSede = () => {
        setNewSede({
            nombre: '',
            departamento: '',
            ciudad: '',
            direccion: '',
            telefono: '',
            color: '',
        });
    };

    const handleAddSede = async () => {
        try {
            await SedeService.createSede(newSede);
            fetchSedes();  // Actualiza la lista de sedes después de agregar una nueva
            setShowModal(false);
            setIsEditMode(false);
            resetNewSede();
        } catch (error) {
            console.error('Error adding sede:', error);
        }
    };

    const handleModalClose = () => {
        resetNewSede();
        setShowModal(false);
        setSelectedSedeId(null);
    };

    const handleUpdateSede = async () => {
        try {
            await SedeService.updateSede(selectedSedeId, newSede);
            fetchSedes();  // Actualiza la lista de sedes después de la actualización
            setShowModal(false);
            setIsEditMode(false);
            resetNewSede();
        } catch (error) {
            console.error(`Error updating sede with ID ${selectedSedeId}:`, error);
        }
    };

    const handleEditSede = (id) => {
        const selectedSede = sedes.find(sede => sede.id === id);
        setNewSede(selectedSede);
        setSelectedSedeId(id);
        setShowModal(true);
        setIsEditMode(true);
    };

    const handleDeleteSede = async (id) => {
        try {
            await SedeService.deleteSede(id);
            fetchSedes();  // Actualiza la lista de sedes después de eliminar
        } catch (error) {
            console.error(`Error deleting sede with ID ${id}:`, error);
        }
    };

    return (
        <>
            <div>
                <h1 className="mt-4">Sedes</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Sedes</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                    </div>
                    <div className="card-body">
                        <h2>Lista de Sedes</h2>
                        <div className='table-responsive'>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(true)}
                                >
                                    Agregar sede
                                </button>
                                <SedeModal
                                    showModal={showModal}
                                    onClose={handleModalClose}
                                    onAddSede={handleAddSede}
                                    onUpdateSede={handleUpdateSede}
                                    newSede={newSede}
                                    handleInputChange={handleInputChange}
                                    isEditMode={isEditMode}
                                    resetNewSede={resetNewSede}
                                />
                            </div>

                            {/* Use the SedeTable component for rendering the table */}
                            <SedeTable
                                sedes={sedes}
                                handleEditSede={handleEditSede}
                                handleDeleteSede={handleDeleteSede}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SedePage;