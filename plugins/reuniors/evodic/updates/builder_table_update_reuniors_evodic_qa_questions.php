<?php namespace Reuniors\Evodic\Updates;

use Schema;
use Winter\Storm\Database\Updates\Migration;

class BuilderTableUpdateReuniorsEvodicQaQuestions extends Migration
{
    public function up()
{
    Schema::table('reuniors_evodic_qa_questions', function($table)
    {
        $table->integer('type')->default(0);
    });
}

public function down()
{
    Schema::table('reuniors_evodic_qa_questions', function($table)
    {
        $table->dropColumn('type');
    });
}
}
