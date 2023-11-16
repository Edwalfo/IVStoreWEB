// CategoriaPage.js
import React, { useEffect, useState } from 'react';
import CategoriaModal from '../../components/modal/CategoriaModal';
import CategoriaTable from '../../components/table/categoriaTable';
import CategoriaService from '../../services/CategoriaServices';

function CategoriaPage() {
    const [categorias, setCategorias] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newCategoria, setNewCategoria] = useState({
        nombre: '',
    });

    const [selectedCategoriaId, setSelectedCategoriaId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        // Fetch categorias from the API when the component mounts
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


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCategoria((prevCategoria) => ({
            ...prevCategoria,
            [name]: value,
        }));
    };

    const resetNewCategoria = () => {
        setNewCategoria({
            nombre: '',

        });
    };

    const handleAddCategoria = async () => {
        try {
            await CategoriaService.createCategoria(newCategoria);
            fetchCategorias(); // Refresh the categorias after adding a new one
            setShowModal(false);
            setIsEditMode(false);
            resetNewCategoria();
        } catch (error) {
            console.error('Error adding categoria:', error);
        }
    };


    const handleModalClose = () => {
        resetNewCategoria();
        setShowModal(false);
        setSelectedCategoriaId(null);
    };



    const handleUpdateCategoria = async () => {
        try {
            await CategoriaService.updateCategoria(selectedCategoriaId, newCategoria);
            fetchCategorias(); // Refresh the categorias after updating
            setShowModal(false);
            setIsEditMode(false);
            resetNewCategoria();
        } catch (error) {
            console.error('Error updating categoria:', error);
        }
    };


    const handleEditCategoria = (id) => {
        const selectedCategoria = categorias.find((categoria) => categoria.id === id);
        setNewCategoria(selectedCategoria);
        setSelectedCategoriaId(id);
        setShowModal(true);
        setIsEditMode(true);
    };

    const handleDeleteCategoria = async (id) => {
        try {
            await CategoriaService.deleteCategoria(id);
            fetchCategorias(); // Refresh the categorias after deleting
        } catch (error) {
            console.error('Error deleting categoria:', error);
        }
    };

    return (
        <>
            <div>
                <h1 className="mt-4">Categorias</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Categorias</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                    </div>
                    <div className="card-body">
                        <h2>Lista de Categorias</h2>
                        <div className='table-responsive'>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(true)}
                                >
                                    Agregar categoria
                                </button>
                                <CategoriaModal
                                    showModal={showModal}
                                    onClose={handleModalClose}
                                    onAddCategoria={handleAddCategoria}
                                    onUpdateCategoria={handleUpdateCategoria}
                                    newCategoria={newCategoria}
                                    handleInputChange={handleInputChange}
                                    isEditMode={isEditMode}
                                    resetNewCategoria={resetNewCategoria}
                                />
                            </div>

                            {/* Use the CategoriaTable component for rendering the table */}
                            <CategoriaTable
                                categorias={categorias}
                                handleEditCategoria={handleEditCategoria}
                                handleDeleteCategoria={handleDeleteCategoria}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoriaPage;