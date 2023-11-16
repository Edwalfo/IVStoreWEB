<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Producto;

class ProductoController extends Controller
{
    public function index()
    {
        $productos = Producto::all();
        return response()->json(['data' => $productos, 'message' => 'Productos recuperados exitosamente']);
    }

    public function show($id)
    {
        $producto = Producto::find($id);

        if ($producto) {
            return response()->json(['data' => $producto, 'message' => 'Producto encontrado exitosamente']);
        } else {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }

    public function store(Request $request)
    {
        $modelo = Producto::create($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Producto creado exitosamente'], 201);
    }

    public function update(Request $request, $id)
    {
        $modelo = Producto::findOrFail($id);
        $modelo->update($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Producto actualizado exitosamente'], 200);
    }

    public function destroy($id)
    {
        $producto = Producto::find($id);

        if ($producto) {
            $producto->delete();
            return response()->json(['message' => 'Producto eliminado exitosamente'], 204);
        } else {
            return response()->json(['message' => 'Producto no encontrado'], 404);
        }
    }
}
