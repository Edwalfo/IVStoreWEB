<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vendedor;
use Illuminate\Support\Facades\DB;

class VendedorController extends Controller
{

    public function getCantidadVentasPorVendedor($fechaInicio = null, $fechaFin = null)
    {
        $query = DB::table('facturas as f')
            ->leftJoin('vendedors as v', 'f.empleado_cedula', '=', 'v.cedula')
            ->select(
                'f.empleado_cedula as cedula',
                'v.nombre',
                'f.sede_id',
                DB::raw('COUNT(f.id) as cantidad_ventas')
            )
            ->groupBy('f.empleado_cedula', 'v.nombre', 'f.sede_id');

        // Aplicar el filtro de fechas solo si se proporcionan ambas fechas
        if ($fechaInicio && $fechaFin) {
            $query->whereBetween('f.fecha', [$fechaInicio, $fechaFin]);
        }

        $ventasPorVendedor = $query->get();

        return response()->json(['data' => $ventasPorVendedor, 'message' => 'Cantidad de ventas por vendedor recuperada exitosamente']);
    }
    
    public function index()
    {
        $vendedors = Vendedor::all();
        return response()->json(['data' => $vendedors, 'message' => 'Vendedor recuperados exitosamente']);
    }

    public function show($id)
    {
        $vendedor = Vendedor::find($id);

        if ($vendedor) {
            return response()->json(['data' => $vendedor, 'message' => 'Vendedor encontrado exitosamente']);
        } else {
            return response()->json(['message' => 'Vendedor no encontrado'], 404);
        }
    }

    public function store(Request $request)
    {
        $modelo = Vendedor::create($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Vendedor creado exitosamente'], 201);
    }

    public function update(Request $request, $id)
    {
        $modelo = Vendedor::findOrFail($id);
        $modelo->update($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Vendedor actualizado exitosamente'], 200);
    }

    public function destroy($id)
    {
        $vendedor = Vendedor::find($id);

        if ($vendedor) {
            $vendedor->delete();
            return response()->json(['message' => 'Vendedor eliminado exitosamente'], 204);
        } else {
            return response()->json(['message' => 'Vendedor no encontrado'], 404);
        }
    }
}
