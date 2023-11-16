<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Factura;
use App\Models\Item;

class FacturaController extends Controller
{
    public function index()
    {
        $facturas = Factura::with('items')->get();
        return response()->json(['data' => $facturas, 'message' => 'Facturas recuperadas exitosamente']);
    }

	
	

    public function show($id)
    {
        $factura = Factura::with('items')->find($id);

        if ($factura) {
            return response()->json(['data' => $factura, 'message' => 'Factura encontrada exitosamente']);
        } else {
            return response()->json(['message' => 'Factura no encontrada'], 404);
        }
    }

    public function store(Request $request)
    {
        $factura = Factura::create($request->all());

        // Crear los items asociados a la factura
        foreach ($request->input('items') as $itemData) {
            Item::create([
                'producto_id' => $itemData['producto_id'],
                'cantidad' => $itemData['cantidad'],
                'factura_id' => $factura->id,
            ]);
        }

        return response()->json(['data' => $factura, 'message' => 'Factura creada exitosamente'], 201);
    }

    public function update(Request $request, $id)
    {
        $factura = Factura::findOrFail($id);
        $factura->update($request->all());

        // Actualizar los items asociados a la factura
        $factura->items()->delete(); // Eliminar los items existentes

        foreach ($request->input('items') as $itemData) {
            Item::create([
                'producto_id' => $itemData['producto_id'],
                'cantidad' => $itemData['cantidad'],
                'factura_id' => $factura->id,
            ]);
        }

        return response()->json(['data' => $factura, 'message' => 'Factura actualizada exitosamente'], 200);
    }

    public function destroy($id)
    {
        $factura = Factura::find($id);

        if ($factura) {
            $factura->items()->delete(); // Eliminar los items asociados
            $factura->delete();
            return response()->json(['message' => 'Factura eliminada exitosamente'], 204);
        } else {
            return response()->json(['message' => 'Factura no encontrada'], 404);
        }
    }
}
