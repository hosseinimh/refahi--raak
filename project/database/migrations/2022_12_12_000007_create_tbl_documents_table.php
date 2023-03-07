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
        Schema::create('tbl_documents', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('description')->default(null);
            $table->string('file')->nullable();
            $table->unsignedBigInteger('unit_id');
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('unit_id')->references('id')->on('tbl_units');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_documents', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
};
