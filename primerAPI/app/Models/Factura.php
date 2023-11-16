<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Factura extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'fecha',
        'total',
        'sede_id',
        'empleado_cedula',
        // Agrega otros campos que desees permitir que se llenen de forma masiva
    ];

    /**
     * Relación "muchos a uno" con la tabla de sedes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sede()
    {
        return $this->belongsTo(Sede::class);
    }

    /**
     * Relación "muchos a uno" con la tabla de empleados.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function empleado()
    {
        return $this->belongsTo(Empleado::class, 'empleado_cedula', 'cedula');
    }

    /**
     * Relación "uno a muchos" con la tabla de ítems.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
