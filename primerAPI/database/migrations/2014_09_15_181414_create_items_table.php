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
        Schema::create('items', function (Blueprint $table) {
            $table->id(); // Auto-incrementing primary key
            $table->integer('cantidad');
            $table->unsignedBigInteger('producto_id');
            $table->unsignedBigInteger('factura_id');
            $table->timestamps(); // Created_at and updated_at columns

            // Foreign key constraints
            $table->foreign('producto_id')
                ->references('id')
                ->on('productos')
                ->onDelete('NO ACTION')
                ->onUpdate('NO ACTION');

            $table->foreign('factura_id')
                ->references('id')
                ->on('facturas')
                ->onDelete('NO ACTION')
                ->onUpdate('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('items');
    }
};
