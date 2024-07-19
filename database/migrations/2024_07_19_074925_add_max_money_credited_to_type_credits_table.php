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
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('type_credits', function (Blueprint $table) {
            $table->decimal('max_money_credited', 15, 2)->nullable()->after('DuréeMax'); // Adjust position as needed
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('type_credits', function (Blueprint $table) {
            $table->dropColumn('max_money_credited');
        });
    }
};
