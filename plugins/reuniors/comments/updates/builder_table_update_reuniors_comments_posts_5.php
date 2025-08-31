<?php namespace Reuniors\Comments\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateReuniorsCommentsPosts5 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->string('attachment_field', 191)->nullable();
            $table->dropColumn('attachment_type');
            $table->dropColumn('field');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->dropColumn('attachment_field');
            $table->string('attachment_type', 191)->nullable();
            $table->string('field', 191)->nullable();
        });
    }
}
