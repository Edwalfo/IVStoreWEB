<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vendedor extends Model
{
    use HasFactory;

      /**
     * The primary key associated with the table.
     *
     * @var string
     */
    protected $primaryKey = 'cedula';

    /**
     * Indicates if the IDs are auto-incrementing.
     *
     * @var bool
     */
    public $incrementing = false;
	

    protected $fillable = [
        'cedula',
        'nombre',
        'telefono',
        'sede_id',
   
    ];

    /**
     * Relación "uno a muchos" con la tabla de facturas.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function facturas()
    {
        return $this->hasMany(Factura::class, 'empleado_cedula', 'cedula');
    }

    /**
     * Relación "uno a uno" con la tabla de usuarios (opcional).
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasOne
     */
    public function user()
    {
        return $this->hasOne(User::class, 'empleado_cedula', 'cedula');
    }

    /**
     * Relación "muchos a uno" con la tabla de sedes.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function sede()
    {
        return $this->belongsTo(Sede::class);
    }
}
