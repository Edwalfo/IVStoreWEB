// ProductoPage.js
import React, { useEffect, useState } from 'react';
import ProductoModal from '../../components/modal/ProductoModal';
import ProductoTable from '../../components/table/ProductoTable';
import ProductoService from '../../services/ProductoServices';


function ProductoPage() {
    const [productos, setProductos] = useState([]);


    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState({
        nombre: '',
        precio: 0,
        talla: '',
        color: '',
        categoria_id: 0,
    });

    const [selectedProductId, setSelectedProductId] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {


        fetchProductos();
    }, []);



    const fetchProductos = async () => {
        try {
            const productosData = await ProductoService.getAllProductos();
            //console.log('Categorias Data:', categoriasData);
            setProductos(productosData);
        } catch (error) {
            console.error('Error fetching categorias:', error);
        }
    };




    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
        }));
    };

    const resetNewProduct = () => {
        setNewProduct({
            nombre: '',
            precio: 0,
            talla: '',
            color: '',
            categoria_id: 0,
        });
    };

    const handleAddProduct = async () => {
       
        try {
            await ProductoService.createProducto(newProduct);
            fetchProductos(); // Refresh the productos after adding a new one
            setShowModal(false);
            setIsEditMode(false);
            resetNewProduct();
        } catch (error) {
            console.error('Error adding producto:', error);
        }
    };

    const handleModalClose = () => {
        resetNewProduct();
        setShowModal(false);
        setSelectedProductId(null);
    };

    const handleUpdateProduct = async() => {

        try {
            await ProductoService.updateProducto(selectedProductId, newProduct);
            fetchProductos(); // Refresh the productos after updating
            setShowModal(false);
            setIsEditMode(false);
            resetNewProduct();
        } catch (error) {
            console.error('Error updating producto:', error);
        }

    };

    const handleEditProduct = (id) => {
        const selectedProduct = productos.find(product => product.id === id);
        setNewProduct(selectedProduct);
        setSelectedProductId(id);
        setShowModal(true);
        setIsEditMode(true);
    };

    const handleDeleteProduct =async(id) => {
     
        try {
            await ProductoService.deleteProducto(id);
            fetchProductos(); // Refresh the productos after deleting
        } catch (error) {
            console.error('Error deleting producto:', error);
        }
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            currencyDisplay: 'symbol',
        }).format(value);
    };

    return (
        <>
            <div>
                <h1 className="mt-4">Productos</h1>
                <ol className="breadcrumb mb-4">
                    <li className="breadcrumb-item active">Productos</li>
                </ol>

                <div className="card mb-4">
                    <div className="card-header">
                        <i className="fas fa-table me-1"></i>
                    </div>
                    <div className="card-body">
                        <h2>Lista de Productos</h2>
                        <div className='table-responsive'>
                            <div className="mb-3">
                                <button
                                    type="button"
                                    className="btn btn-primary"
                                    onClick={() => setShowModal(true)}
                                >
                                    Agregar producto
                                </button>
                                <ProductoModal
                                    showModal={showModal}
                                    onClose={handleModalClose}
                                    onAddProduct={handleAddProduct}
                                    onUpdateProduct={handleUpdateProduct}
                                    newProduct={newProduct}
                                    handleInputChange={handleInputChange}
                                    isEditMode={isEditMode}
                                    resetNewProduct={resetNewProduct}
                                />
                            </div>

                            {/* Use the ProductTable component for rendering the table */}
                            <ProductoTable
                                products={productos}
                                formatCurrency={formatCurrency}
                                handleEditProduct={handleEditProduct}
                                handleDeleteProduct={handleDeleteProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductoPage;