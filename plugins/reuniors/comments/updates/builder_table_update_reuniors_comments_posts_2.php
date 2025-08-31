<?php 

namespace Reuniors\Comments\Updates;

use Schema;
use October\Rain\Database\Updates\Migration;

class BuilderTableUpdateReuniorsCommentsPosts2 extends Migration
{
    public function up()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->string('content', 500)->nullable(false)->unsigned(false)->default(null)->change();
        });
    }
    
    public function down()
    {
        Schema::table('reuniors_comments_posts', function($table)
        {
            $table->text('content')->nullable(false)->unsigned(false)->default(null)->change();
        });
    }
}
