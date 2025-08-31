<?php namespace Reuniors\Comments\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateReuniorsCommentsPosts4 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->integer('attachment_id')->nullable()->unsigned();
            $table->string('attachment_type', 191)->nullable();
            $table->string('field', 191)->nullable();
            $table->smallInteger('with_rating')->unsigned()->default(0);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->dropColumn('attachment_id');
            $table->dropColumn('attachment_type');
            $table->dropColumn('field');
            $table->dropColumn('with_rating');
        });
    }
}
