<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spending;

class SpendingController extends Controller
{
    public function getSpendings(Spending $spending) {
        $spendings = $spending::with('category')->get()->toArray();
        return \Response::json([$spendings], 200);
    }
}
