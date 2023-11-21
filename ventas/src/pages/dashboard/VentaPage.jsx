// VentaPage.js
import React, { useEffect, useState } from 'react';
import VentaModal from '../../components/modal/FacturacionModal';
import VentaTable from '../../components/table/VentaTable';
import VentaService from '../../services/VentaServices';

function VentaPage() {
    const [ventas, setVentas] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newVenta, setNewVenta] = useState({
        fecha: '',
        total: 0,
        sede_id: 0,
        empleado_cedula: '',
        items: []
    });

    const [selectedVentaId, setSelectedVentaId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    // Al cargar el componente, obtén todas las ventas
    useEffect(() => {
        fetchVentas();
    }, []);

    const fetchVentas = async () => {
        try {
            const ventasData = await VentaService.getAllVentas();
            setVentas(ventasData);
        } catch (error) {
            console.error('Error fetching ventas:', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVenta((prevVenta) => ({
            ...prevVenta,
            [name]: value,
        }));
    };

    const resetNewVenta = () => {
        setNewVenta({
            fecha: '',
            total: 0,
            sede_id: 0,
            empleado_cedula: '',
            items: []
        });
    };

    const handleAddVenta = async (formData) => {

        try {
            await VentaService.createVenta(formData);

            fetchVentas();  // Actualiza la lista de ventas después de agregar una nueva
            setShowModal(false);
            setIsEditMode(false);
            resetNewVenta();
        } catch (error) {
            console.error('Error adding venta:', error);
        }
    };

    const handleModalClose = () => {
        resetNewVenta();
        setShowModal(false);
        setSelectedVentaId(null);
    };

    const handleUpdateVenta = async (formData) => {
        try {
            await VentaService.updateVenta(selectedVentaId, formData);
            fetchVentas();  // Actualiza la lista de ventas después de la actualización
            setShowModal(false);
            setIsEditMode(false);
            resetNewVenta();
        } catch (error) {
            console.error(`Error updating venta with ID ${selectedVentaId}:`, error);
        }
    };

    const handleEditVenta = (id) => {
        const selectedVenta = ventas.find(venta => venta.id === id);
        setNewVenta(selectedVenta);
        setSelectedVentaId(id);
        setShowModal(true);
        setIsEditMode(true);
    };

    const handleDeleteVenta = async (id) => {
        try {
            await VentaService.deleteVenta(id);
            fetchVentas();  // Actualiza la lista de ventas después de eliminar
        } catch (error) {
            console.error(`Error deleting venta with ID ${id}:`, error);
        }
    };

    const handleFormSubmit = (data) => {
        if (isEditMode) {
            // Lógica para la actualización
            handleUpdateVenta(data);
        } else {
            // Lógica para la adición
            handleAddVenta(data);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
        }).format(value);
    };



    return (
        <>
            <div>
                <h1 className="mt-4">Ventas</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Ventas</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                    </div>
                    <div className="card-body">
                        <h2>Lista de Ventas</h2>
                        <div className='table-responsive'>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(true)}
                                >
                                    Agregar venta
                                </button>
                                <VentaModal
                                    showModal={showModal}
                                    onClose={handleModalClose}
                                    onAddVenta={handleAddVenta}
                                    onUpdateVenta={handleUpdateVenta}
                                    newVenta={newVenta}
                                    handleInputChange={handleInputChange}
                                    isEditMode={isEditMode}
                                    resetNewVenta={resetNewVenta}
                                    handleFormSubmit={handleFormSubmit}
                                />
                            </div>

                            {/* Use the VentaTable component for rendering the table */}
                            <VentaTable
                                ventas={ventas}
                                formatCurrency={formatCurrency}
                                handleEditVenta={handleEditVenta}
                                handleDeleteVenta={handleDeleteVenta}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VentaPage;