<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNotificationsToPolymorphic extends Migration
{
    public function up()
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Drop the old columns if they exist
            $table->dropColumn('project_id');
            $table->dropColumn('task_id');

            // Add polymorphic columns
            $table->morphs('notifiable'); // Adds notifiable_id and notifiable_type
        });
    }

    public function down()
    {
        Schema::table('notifications', function (Blueprint $table) {
            $table->dropMorphs('notifiable');
            $table->unsignedBigInteger('project_id')->nullable();
            $table->unsignedBigInteger('task_id')->nullable();
        });
    }
}

