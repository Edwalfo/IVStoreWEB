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
        Schema::create('vendedors', function (Blueprint $table) {
            $table->bigInteger('cedula')->unsigned()->primary();
            $table->string('nombre', 45);
            $table->string('telefono', 45)->nullable();
            $table->unsignedBigInteger('sede_id');
            $table->timestamps(); // Created_at and updated_at columns

            // Foreign key constraint
            $table->foreign('sede_id')
                ->references('id')
                ->on('sedes')
                ->onDelete('NO ACTION')
                ->onUpdate('NO ACTION');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vendedors');
    }
};
