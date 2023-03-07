<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTblTicketThreadsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tbl_ticket_threads', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('ticket_id');
            $table->unsignedBigInteger('creator_id');
            $table->unsignedTinyInteger('admin_created');
            $table->text('content');
            $table->string('file')->nullable();
            $table->dateTime('user_seen_time')->nullable();
            $table->dateTime('admin_seen_time')->nullable();
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('ticket_id')->references('id')->on('tbl_tickets');
            $table->foreign('creator_id')->references('id')->on('tbl_users');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tbl_ticket_threads', function (Blueprint $table) {
            $table->dropSoftDeletes();
        });
    }
}
