<?php 

namespace Reuniors\Comments\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateReuniorsCommentsPosts3 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->dropColumn('post_id');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->integer('post_id')->nullable();
        });
    }
}
