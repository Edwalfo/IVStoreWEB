<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('facturas', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->dateTime('fecha');
            $table->string('total', 45);
            $table->unsignedBigInteger('sede_id');
            $table->unsignedBigInteger('empleado_cedula');
            $table->timestamps(); // Created_at and updated_at columns
        
            // Foreign key constraints
            $table->foreign('sede_id')
                ->references('id')
                ->on('sedes')
                ->onDelete('NO ACTION')
                ->onUpdate('NO ACTION');
        
            $table->foreign('empleado_cedula')
                ->references('cedula')
                ->on('vendedors') // Cambiado de 'vendedors' a 'vendedors'
                ->onDelete('NO ACTION')
                ->onUpdate('NO ACTION');
        });

 

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('facturas');
    }
};
