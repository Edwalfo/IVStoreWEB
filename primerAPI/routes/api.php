<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductoController;
use App\Http\Controllers\SedeController;
use App\Http\Controllers\VendedorController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FacturaController;
use App\Http\Controllers\CategoriaController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/


    // Rutas para productos
    Route::get('/productos', [ProductoController::class, 'index'])->name('productos.index');
    Route::get('/productos/{id}', [ProductoController::class, 'show'])->name('productos.show');
    Route::post('/productos', [ProductoController::class, 'store'])->name('productos.store');
    Route::put('/productos/{id}', [ProductoController::class, 'update'])->name('productos.update');
    Route::delete('/productos/{id}', [ProductoController::class, 'destroy'])->name('productos.destroy');

    // Rutas para categorías
    Route::get('/categorias', [CategoriaController::class, 'index'])->name('categorias.index');
    Route::get('/categorias/{id}', [CategoriaController::class, 'show'])->name('categorias.show');
    Route::post('/categorias', [CategoriaController::class, 'store'])->name('categorias.store');
    Route::put('/categorias/{id}', [CategoriaController::class, 'update'])->name('categorias.update');
    Route::delete('/categorias/{id}', [CategoriaController::class, 'destroy'])->name('categorias.destroy');

    // Rutas para sedes
    Route::get('/sedes', [SedeController::class, 'index'])->name('sedes.index');
    Route::get('/sedes/{id}', [SedeController::class, 'show'])->name('sedes.show');
    Route::post('/sedes', [SedeController::class, 'store'])->name('sedes.store');
    Route::put('/sedes/{id}', [SedeController::class, 'update'])->name('sedes.update');
    Route::delete('/sedes/{id}', [SedeController::class, 'destroy'])->name('sedes.destroy');

    // Rutas para vendedor
    Route::get('/vendedors', [VendedorController::class, 'index'])->name('vendedors.index');
    Route::get('/vendedors/{id}', [VendedorController::class, 'show'])->name('vendedors.show');
    Route::post('/vendedors', [VendedorController::class, 'store'])->name('vendedors.store');
    Route::put('/vendedors/{id}', [VendedorController::class, 'update'])->name('vendedors.update');
    Route::delete('/vendedors/{id}', [VendedorController::class, 'destroy'])->name('vendedors.destroy');
	Route::get('/cantVentas', [VendedorController::class, 'getCantidadVentasPorVendedor']);

    // Rutas para sede
    Route::get('/facturas', [FacturaController::class, 'index'])->name('facturas.index');
    Route::get('/facturas/{id}', [FacturaController::class, 'show'])->name('facturas.show');
    Route::post('/facturas', [FacturaController::class, 'store'])->name('facturas.store');
    Route::put('/facturas/{id}', [FacturaController::class, 'update'])->name('facturas.update');
    Route::delete('/facturas/{id}', [FacturaController::class, 'destroy'])->name('facturas.destroy');

    // Rutas para usuario
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{id}', [UserController::class, 'show'])->name('users.show');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::get('/profile', [UserController::class, 'profile'])->name('users.profile');
