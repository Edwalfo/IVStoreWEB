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
        Schema::create('productos', function (Blueprint $table) {
            $table->id(); 
            $table->string('nombre', 45);
            $table->integer('precio');
            $table->string('talla', 45)->nullable();
            $table->string('color', 45)->nullable();
            $table->unsignedBigInteger('categoria_id');
            $table->timestamps();

            // Foreign key constraint
            $table->foreign('categoria_id')
                ->references('id')
                ->on('categorias')
                ->onDelete('NO ACTION')
                ->onUpdate('NO ACTION');
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('productos');
    }
};
