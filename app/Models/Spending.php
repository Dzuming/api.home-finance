<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Spending extends Model
{
    protected $fillable = ['category_id', 'user_id', 'description', 'value', 'created_at'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
