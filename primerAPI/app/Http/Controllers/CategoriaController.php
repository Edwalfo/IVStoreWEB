<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Categoria;

class CategoriaController extends Controller
{
    public function index()
    {
        $categorias = Categoria::all();
        return response()->json(['data' => $categorias, 'message' => 'Categorías recuperadas exitosamente']);
    }

    public function show($id)
    {
        $categoria = Categoria::find($id);

        if ($categoria) {
            return response()->json(['data' => $categoria, 'message' => 'Categoría encontrada exitosamente']);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }

    public function store(Request $request)
    {
        $modelo = Categoria::create($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Categoría creada exitosamente'], 201);
    }

    public function update(Request $request, $id)
    {
        $modelo = Categoria::findOrFail($id);
        $modelo->update($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Categoría actualizada exitosamente'], 200);
    }

    public function destroy($id)
    {
        $categoria = Categoria::find($id);

        if ($categoria) {
            $categoria->delete();
            return response()->json(['message' => 'Categoría eliminada exitosamente'], 204);
        } else {
            return response()->json(['message' => 'Categoría no encontrada'], 404);
        }
    }
}
