<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('type_credits', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string('name');
            $typeCredit = ['credit de consommation','credit de logement','credit de immobilier','credit de voiture','credit long terme','credit court terme'];
            $table->enum('TypeCredit', $typeCredit);
            $table->string('TauxInteret');
            $table->string('DuréeMax');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('type_credits');
    }
};
