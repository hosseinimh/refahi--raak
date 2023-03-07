<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblTicketsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_tickets', function (Blueprint $table) {
            $table->id();
            $table->unsignedTinyInteger('type');
            $table->unsignedBigInteger('creator_id');
            $table->unsignedTinyInteger('admin_created');
            $table->unsignedBigInteger('unit_id');
            $table->string('subject');
            $table->unsignedTinyInteger('status')->default(1);
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('creator_id')->references('id')->on('tbl_users');
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
        Schema::table('tbl_tickets', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
