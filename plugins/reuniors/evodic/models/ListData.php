<?php namespace Reuniors\Evodic\Models;

use Model;

/**
 * Model
 */
class ListData extends Model
{
    use \Winter\Storm\Database\Traits\Validation;

    use \Winter\Storm\Database\Traits\SoftDelete;

    protected $dates = ['deleted_at'];


    /**
     * @var string The database table used by the model.
     */
    public $table = 'reuniors_evodic_list_data';

    /**
     * @var array Validation rules
     */
    public $rules = [
    ];

    /**
     * Schema::create('reuniors_evodic_list_data', function($table)
    {
    $table->engine = 'InnoDB';
    $table->increments('id')->unsigned();
    $table->timestamp('created_at')->nullable();
    $table->timestamp('updated_at')->nullable();
    $table->timestamp('deleted_at')->nullable();
    $table->integer('list_id')->unsigned();
    $table->text('title');
    $table->integer('active')->unsigned();
    $table->integer('tag_id')->nullable()->unsigned();
    });
     */
    protected $fillable = [
        'title',
        'active',
    ];

    protected $hidden = [
        'list_id',
        'tag_id',
    ];

    public $belongsTo = [
        'list' => [
            'Reuniors\Evodic\Models\BaseList',
            'order' => 'name'
        ],
        'tag' => [
            'Reuniors\Evodic\Models\Tag',
            'order' => 'name'
        ],
    ];
}
