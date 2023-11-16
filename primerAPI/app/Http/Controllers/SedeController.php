<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Sede;

class SedeController extends Controller
{
    public function index()
    {
        $sedes = Sede::all();
        return response()->json(['data' => $sedes, 'message' => 'Productos recuperados exitosamente']);
    }

    public function show($id)
    {
        $sede = Sede::find($id);

        if ($sede) {
            return response()->json(['data' => $sede, 'message' => 'Sede encontrado exitosamente']);
        } else {
            return response()->json(['message' => 'Sede no encontrado'], 404);
        }
    }

    public function store(Request $request)
    {
        $modelo = Sede::create($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Sede creado exitosamente'], 201);
    }

    public function update(Request $request, $id)
    {
        $modelo = Sede::findOrFail($id);
        $modelo->update($request->all());
        return response()->json(['data' => $modelo, 'message' => 'Sede actualizado exitosamente'], 200);
    }

    public function destroy($id)
    {
        $sede = Sede::find($id);

        if ($sede) {
            $sede->delete();
            return response()->json(['message' => 'Sede eliminado exitosamente'], 204);
        } else {
            return response()->json(['message' => 'Sede no encontrado'], 404);
        }
    }
}
