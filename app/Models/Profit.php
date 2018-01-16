<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profit extends Model
{
    protected $fillable = ['category_id', 'description', 'value'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
