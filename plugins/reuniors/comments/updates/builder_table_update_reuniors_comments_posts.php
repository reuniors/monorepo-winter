<?php 

namespace Reuniors\Comments\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateReuniorsCommentsPosts extends Migration
{
    public function up()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->string('url', 70)->index();
            $table->dropColumn('type');
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->dropColumn('url');
            $table->string('type', 20)->nullable();
        });
    }
}
