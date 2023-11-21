import React, { useState, useEffect } from 'react';
import ProductoServices from '../../services/ProductoServices';
import VendedorServices from '../../services/VendedorServices';
import SedeServices from '../../services/SedeServices';

const FacturacionFormulario = ({
    showModal, onClose, onAddVenta, onUpdateVenta, newVenta, handleInputChange, isEditMode
}) => {
    const [productos, setProductos] = useState([]);
    const [sedes, setSedes] = useState([]);
    const [vendedores, setVendedores] = useState([]);

    const [fecha, setFecha] = useState('');
    const [precioTotal, setPrecioTotal] = useState(0);
    const [itemsAgregados, setItemsAgregados] = useState([]);

    const [productoSeleccionado, setProductoSeleccionado] = useState('');
    const [sedeSeleccionada, setSedeSeleccionada] = useState('');
    const [vendedorSeleccionado, setVendedorSeleccionado] = useState('');

    const [cantidad, setCantidad] = useState(parseFloat(0));
    const [precioProducto, setPrecioProducto] = useState(parseFloat(0));

    const [vendedoresPorSede, setVendedoresPorSede] = useState([]);

    useEffect(() => {
        fetchProductos();
        fetchSedes();
        fetchVendedores();
        const today = new Date().toISOString().split('T')[0];
        setFecha(today);
        if (isEditMode) {
            handleEditMode();
        }

    }, [isEditMode, newVenta]);


    const fetchProductos = async () => {
        try {
            const productosData = await ProductoServices.getAllProductos();
            setProductos(productosData);
        } catch (error) {
            console.error('Error fetching productos:', error);
        }
    };

    const fetchSedes = async () => {
        try {
            const sedesData = await SedeServices.getAllSedes();
            setSedes(sedesData);
        } catch (error) {
            console.error('Error fetching sedes:', error);
        }
    };

    const fetchVendedores = async () => {
        try {
            const vendedoresData = await VendedorServices.getAllVendedors();
            setVendedores(vendedoresData);
        } catch (error) {
            console.error('Error fetching vendedores:', error);
        }
    };

    const handleEditMode = () => {



        // Lógica para establecer los valores iniciales del formulario cuando estás editando
        setFecha(newVenta.fecha);
        setPrecioTotal(parseInt(newVenta.total));
        setSedeSeleccionada(newVenta.sede_id);
        setVendedorSeleccionado(newVenta.empleado_cedula);
        handleSedeChange({ target: { value: newVenta.sede_id } });


        if (vendedores && newVenta.sede_id) {
            console.log('Sede ID:', newVenta.sede_id);

            const vendedoresFiltrados = vendedores.filter((vendedor) => vendedor.sede_id === parseInt(newVenta.sede_id, 10));

            console.log('Vendedores Filtrados:', vendedoresFiltrados);
            setVendedoresPorSede(vendedoresFiltrados);
        }



        // Establecer valores para itemsAgregados en modo de edición
        const editedItems = newVenta.items.map((item) => {
            const producto = productos.find((p) => p.id === item.producto_id);

            // Verificar que el producto y los valores necesarios estén definidos
            const precioUnitario = producto ? producto.precio : 0;
            const cantidad = item.cantidad || 0;
            const subtotal = precioUnitario * cantidad;

            return {
                ...item,
                precioUnitario,
                subtotal,
            };
        });

        setItemsAgregados(editedItems);



    }

    const handleProductoChange = (e) => {
        const producto_id = e.target.value;
        setProductoSeleccionado(producto_id);

        const producto = productos.find((p) => p.id === parseInt(producto_id));
        setPrecioProducto(producto ? producto.precio : 0);
    };

    const handleCantidadChange = (e) => {
        setCantidad(parseInt(e.target.value, 10) || 0);
    };

    const handleFechaChange = (e) => {
        setFecha(e.target.value);
    };

    const handleAgregarItem = () => {
        if (!productoSeleccionado) {
            alert('Selecciona un producto antes de agregarlo.');
            return;
        }

        const producto = productos.find((p) => p.id === parseInt(productoSeleccionado));
        const existeEnTabla = itemsAgregados.some((item) => item.producto_id === producto.id);

        if (cantidad < 1) {
            alert('Agrega la cantidad del producto.');
            return;
        }

        if (existeEnTabla) {
            alert('Este producto ya ha sido agregado.');
            return;
        }


        const subtotal = cantidad * (producto.precio || precioProducto); // Asegúrate de usar el precio correcto

        const newItem = {
            producto_id: producto.id,
            cantidad,
            precioUnitario: producto.precio || precioProducto, // Asegúrate de usar el precio correcto
            subtotal,
        };

        setItemsAgregados([...itemsAgregados, newItem]);
        setPrecioTotal(precioTotal + subtotal);

        setProductoSeleccionado('');
        setCantidad(0);
        setPrecioProducto(0);
    };

    const handleRemoverItem = (index) => {
        const removedItem = itemsAgregados[index];
        const subtotal = removedItem.subtotal;

        setItemsAgregados(itemsAgregados.filter((i) => i !== index));

        if (itemsAgregados.length < 1) {
            setPrecioTotal(0);
        } else {
            setPrecioTotal(precioTotal - subtotal);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = {
            fecha,
            sede_id: sedeSeleccionada,
            empleado_cedula: vendedorSeleccionado,
            total: precioTotal,
            items: itemsAgregados,
        };

        if (itemsAgregados.length > 0) {
            if (isEditMode) {
                onUpdateVenta(formData);  // Lógica para la actualización
                resetForm();
            } else {
                onAddVenta(formData);  // Lógica para la adición
                resetForm();
            }
        } else {
            alert("No tiene producto en la lista");
        }
    };

    const resetForm = () => {
        setFecha('');
        setPrecioTotal(0);
        setItemsAgregados([]);
        setProductoSeleccionado('');
        setCantidad(0);
        setPrecioProducto(0);
        setSedeSeleccionada('');
        setVendedorSeleccionado('');
    };


    const handleVendedorChange = (e) => {
        setVendedorSeleccionado(e.target.value);
    };

    const handleSedeChange = (e) => {
        const sedeId = e.target.value;
        setSedeSeleccionada(sedeId);

        if (vendedores && sedeId) {
            const vendedoresFiltrados = vendedores.filter((vendedor) => String(vendedor.sede_id) === sedeId);

            setVendedoresPorSede(vendedoresFiltrados);
        }
    };


    const FormatoColombiano = (valor) => {

        const formatoColombiano = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP'
        });

        return formatoColombiano.format(valor);
    };

    return (
        <>
            <div
                className={`modal fade ${showModal ? 'show' : ''}`}
                style={{ display: showModal ? 'block' : 'none' }}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="ventaModal"
                aria-hidden={!showModal}
            >
                <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="ventaModal">Facturación</h5>
                            <button type="button" className="btn-close" onClick={onClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <h5>Ítems:</h5>
                                    {/* ... (resto del formulario) */}
                                    <div className="mb-3">


                                        <div className="row mb-3">
                                            <div className="col-lg-4">
                                                <label htmlFor="sede" className="form-label">Sedes:</label>

                                                <select
                                                    id="sede"
                                                    className="form-control"
                                                    value={sedeSeleccionada}
                                                    onChange={handleSedeChange}

                                                >
                                                    <option key="defaultSede" value="">Selecciona una sede</option>
                                                    {sedes.map((sede) => (
                                                        <option key={sede.id} value={sede.id}>
                                                            {sede.nombre}
                                                        </option>
                                                    ))}
                                                </select>


                                            </div>
                                            <div className="col-lg-4">
                                                <label htmlFor="vendedor" className="form-label">Vendedor:</label>
                                                <select
                                                    id="vendedor"
                                                    className="form-control"
                                                    value={vendedorSeleccionado}
                                                    onChange={handleVendedorChange}
                                                >
                                                    <option key="defaultVendedor" value="">
                                                        Selecciona un vendedor
                                                    </option>
                                                    {vendedoresPorSede.map((vendedor) => (
                                                        <option key={vendedor.cedula} value={vendedor.cedula}>
                                                            {vendedor.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                        </div>
                                        <div className="mb-3">
                                            <div className="row">
                                                <div className="col"><label htmlFor="fecha" className="form-label">Fecha:</label>
                                                    <input type="datetime" id="fecha" className="form-control" value={fecha} onChange={handleFechaChange} /></div>
                                                <div className="col"> <label htmlFor="total" className="form-label">Total:</label>
                                                    <input type="text" id="total" className="form-control" value={FormatoColombiano(precioTotal)} readOnly /></div>
                                            </div>
                                        </div>


                                        <div className="row">
                                            <div className="col-lg-4">
                                                <label htmlFor="" key="defaultProducto" className="form-label">Producto:</label>
                                                <select
                                                    id="producto"
                                                    className="form-control"
                                                    value={productoSeleccionado}
                                                    onChange={handleProductoChange}
                                                >
                                                    <option value="" key="dafaultproducto">Selecciona un producto</option>
                                                    {productos.map((producto) => (
                                                        <option key={producto.id} value={producto.id}>
                                                            {producto.nombre}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className="col-lg-4">
                                                <label htmlFor="cantidad" className="form-label">Cantidad:</label>
                                                <input
                                                    type="number"
                                                    id="cantidad"
                                                    className="form-control"
                                                    value={cantidad}
                                                    onChange={handleCantidadChange}
                                                />
                                            </div>



                                            <div className="col-lg-4">
                                                <label htmlFor="precio" className="form-label">Precio Unitario:</label>
                                                <input
                                                    type="text"
                                                    id="precio"
                                                    className="form-control"
                                                    value={FormatoColombiano(precioProducto)}
                                                    readOnly
                                                />

                                            </div>

                                        </div>
                                    </div>
                                    <div className="modal-footer">
                                        <button type="button" className="btn btn-secondary" onClick={handleAgregarItem}>
                                            Agregar item
                                        </button>
                                        <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                                            {isEditMode ? 'Actualizar' : 'Agregar'} Factura
                                        </button>
                                    </div>
                                </div>
                            </form>
                            <div className="mt-4 table-responsive">
                                <table className="table">
                                    <thead>
                                        <tr><th>N°</th>
                                            <th>Producto</th>
                                            <th>Cantidad</th>
                                            <th>Precio Unitario</th>
                                            <th>Subtotal</th>
                                            <th>Acciones</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {itemsAgregados.map((item, index) => (
                                            <tr key={index}>
                                                <th>{index + 1}</th>
                                                <td>{productos.find((p) => p.id === parseInt(item.producto_id)).nombre}</td>
                                                <td>{item.cantidad}</td>
                                                <td>{FormatoColombiano(item.precioUnitario)}</td>
                                                <td>{FormatoColombiano(item.subtotal)}</td>
                                                <td>
                                                    <button
                                                        type="button"
                                                        className="btn btn-danger btn-sm"
                                                        onClick={() => handleRemoverItem(index)}
                                                    >
                                                        <i className="fa fa-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default FacturacionFormulario;