<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateNotificationsToPolymorphic extends Migration
{
    public function up()
    {
        Schema::table('notifications', function (Blueprint $table) {
            // Drop old foreign key constraints and columns if they exist
            if (Schema::hasColumn('notifications', 'project_id')) {
                try {
                    $table->dropForeign(['project_id']);
                } catch (\Exception $e) {
                    // Foreign key might not exist, ignore
                }
                $table->dropColumn('project_id');
            }

            if (Schema::hasColumn('notifications', 'task_id')) {
                try {
                    $table->dropForeign(['task_id']);
                } catch (\Exception $e) {
                   
                }
                $table->dropColumn('task_id');
            }
        });

        Schema::table('notifications', function (Blueprint $table) {
            if (!Schema::hasColumn('notifications', 'notifiable_id') &&
                !Schema::hasColumn('notifications', 'notifiable_type')) {
                $table->morphs('notifiable');
            }
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

