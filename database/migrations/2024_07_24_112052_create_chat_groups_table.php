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
        Schema::create('chat_groups', function (Blueprint $table) {
            $table->id();
            $table->string('name', 100);
            $table->timestamp('datetime')->useCurrent();
            $table->timestamps();
        });

        Schema::create('chat_group_chat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('chat_id')->constrained()->onDelete('cascade');
            $table->foreignId('chat_group_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chat_group_chat');
        Schema::dropIfExists('chat_groups');
    }
};
