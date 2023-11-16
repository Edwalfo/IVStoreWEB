<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sede extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
		'nombre',
        'ciudad',
        'telefono',
        'departamento',
        'direccion',
        'color',
        // Agrega otros campos que desees permitir que se llenen de forma masiva
    ];

    /**
     * Relación "uno a muchos" con la tabla de empleados.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function vendedors()
    {
        return $this->hasMany(Empleado::class);
    }

    /**
     * Relación "uno a muchos" con la tabla de productos.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function productos()
    {
        return $this->hasMany(Producto::class);
    }
}
