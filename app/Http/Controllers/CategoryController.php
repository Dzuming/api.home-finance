<?php

namespace App\Http\Controllers;

use App\Models\Category;

class CategoryController extends Controller
{
    public function getCategories() {
        return \Response::json(Category::all(), 200);
    }
}
