<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Item extends Model
{
    use HasFactory;

    /**
     * Los atributos que son asignables masivamente.
     *
     * @var array
     */
    protected $fillable = [
        'cantidad',
        'producto_id',
        'factura_id',
        // Agrega otros campos que desees permitir que se llenen de forma masiva
    ];

    /**
     * Relación "muchos a uno" con la tabla de productos.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }

    /**
     * Relación "muchos a uno" con la tabla de facturas.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function factura()
    {
        return $this->belongsTo(Factura::class);
    }
}
