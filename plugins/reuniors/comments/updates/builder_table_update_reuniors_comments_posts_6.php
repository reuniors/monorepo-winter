<?php namespace Reuniors\Comments\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsCommentsPosts6 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->integer('likes_count')->unsigned()->default(0);
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->dropColumn('likes_count');
        });
    }
}
