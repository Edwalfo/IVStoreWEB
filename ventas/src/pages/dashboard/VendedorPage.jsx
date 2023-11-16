import React, { useState, useEffect } from 'react';
import VendedorModal from '../../components/modal/VendedorModal';
import VendedorTable from '../../components/table/VendedorTable';
import VendedorService from '../../services/VendedorServices'; // Import the VendedorService


function VendedorPage() {
    // Datos de vendedores

    const [vendedores, setVendedors] = useState([]);

    useEffect(() => {
        // Fetch vendedors when the component mounts
        fetchVendedores();
    }, []);

    const fetchVendedores = async () => {
        try {
            const vendedoresData = await VendedorService.getAllVendedors();
            setVendedors(vendedoresData);
        } catch (error) {
            console.error('Error fetching vendedors:', error);
        }
    };  


    const [showModal, setShowModal] = useState(false);
    const [newVendedor, setNewVendedor] = useState({
        cedula: '',
        nombre: '',
        telefono: '',
        sede_id: '',
    });

    const [selectedVendedorId, setSelectedVendedorId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewVendedor((prevVendedor) => ({
            ...prevVendedor,
            [name]: value,
        }));
    };

    const resetNewVendedor = () => {
        setNewVendedor({
            cedula: '',
            nombre: '',
            telefono: '',
            sede_id: '',
        });
    };

    const handleAddVendedor = async () => {
        try {
            await VendedorService.createVendedor(newVendedor);
            fetchVendedores(); // Refresh the vendedors after adding a new one
            setShowModal(false);
            setIsEditMode(false);
            resetNewVendedor();
        } catch (error) {
            console.error('Error adding vendedor:', error);
        }
    };

    const handleModalClose = () => {
        resetNewVendedor();
        setShowModal(false);
        setSelectedVendedorId(null);
    };

    const handleUpdateVendedor = async () => {
        try {
            await VendedorService.updateVendedor(selectedVendedorId, newVendedor);

            fetchVendedores(); 
            setShowModal(false);
            setIsEditMode(false);
            resetNewVendedor();
        } catch (error) {
            console.error('Error updating vendedor:', error);
        }
    };

    const handleEditVendedor = (cedula) => {
        const selectedVendedor = vendedores.find(vendedor => vendedor.cedula === cedula);

     
        setNewVendedor(selectedVendedor);
        setSelectedVendedorId(cedula);
        setShowModal(true);
        setIsEditMode(true);
    };

    const handleDeleteVendedor = async (cedula) => {

        try {
            await VendedorService.deleteVendedor(cedula);
            fetchVendedores(); // Refresh the vendedors after deleting
        } catch (error) {
            console.error('Error deleting vendedor:', error);
        }
    };


    return (
        <>
            <div>
                <h1 className="mt-4">Vendedores</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Vendedores</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                    </div>
                    <div className="card-body">
                        <h2>Lista de Vendedores</h2>
                        <div className='table-responsive'>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(true)}
                                >
                                    Agregar vendedor
                                </button>
                                <VendedorModal
                                    showModal={showModal}
                                    onClose={handleModalClose}
                                    onAddVendedor={handleAddVendedor}
                                    onUpdateVendedor={handleUpdateVendedor}
                                    newVendedor={newVendedor}
                                    handleInputChange={handleInputChange}
                                    isEditMode={isEditMode}
                                    resetNewVendedor={resetNewVendedor}
                                />
                            </div>

                            {/* Use the VendedorTable component for rendering the table */}
                            <VendedorTable
                                vendedors={vendedores}
                                handleEditVendedor={handleEditVendedor}
                                handleDeleteVendedor={handleDeleteVendedor}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default VendedorPage;