<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $users = User::all();
        return response()->json(['data' => $users, 'message' => 'Usuarios recuperados exitosamente']);
    }

    public function show($id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json(['data' => $user, 'message' => 'Usuario encontrado exitosamente']);
        } else {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
    }

    public function store(Request $request)
    {
        try {
            $request->validate([
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
                'empleado_cedula' => 'nullable|exists:vendedors,cedula',
            ]);

            $user = User::create([
                'email' => $request->input('email'),
                'password' => Hash::make($request->input('password')),
                'empleado_cedula' => $request->input('empleado_cedula'),
            ]);

            return response()->json(['data' => $user, 'message' => 'Usuario creado exitosamente'], 201);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function profile(Request $request)
    {
        $user = $request->user();

        if ($user->vendedor) {
            $vendedorDetails = $user->vendedor;
            return response()->json(['user' => $user, 'vendedor_details' => $vendedorDetails]);
        }

        return response()->json(['user' => $user, 'message' => 'Perfil del usuario recuperado exitosamente']);
    }
}
