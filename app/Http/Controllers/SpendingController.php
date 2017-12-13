<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spending;

class SpendingController extends Controller
{
    public function index() {
        $spendings = Spending::with('category')->get()->toArray();
        return \Response::json([$spendings], 200);
    }

    public function store(Request $request) {
        $input = $request->all();
        Spending::create($input);
        
        return \Response::json('Zapis do bazy zakończył się powodzeniem', 200);
    }
}
