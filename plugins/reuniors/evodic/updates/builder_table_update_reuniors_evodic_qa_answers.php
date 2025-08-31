<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicQaAnswers extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_qa_answers', function($table)
    {
        $table->integer('location_id')->unsigned();
        $table->text('text')->nullable()->change();
    });
}

public function down()
{
    Schema::table('reuniors_evodic_qa_answers', function($table)
    {
        $table->dropColumn('location_id');
        $table->text('text')->nullable(false)->change();
    });
}
}
