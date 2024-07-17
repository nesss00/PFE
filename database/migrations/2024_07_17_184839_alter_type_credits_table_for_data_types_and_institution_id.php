<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::table('type_credits', function (Blueprint $table) {
            // Change TauxInteret to decimal

            // Add foreign key for institution_id
            $table->foreignId('institution_id')->constrained()->onDelete('cascade');
        });
    }

    public function down()
    {
        Schema::table('type_credits', function (Blueprint $table) {
            // Revert TauxInteret back to string

            // Remove the foreign key for institution_id
            $table->dropConstrainedForeignId('institution_id');
        });
    }
};
