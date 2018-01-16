<?php

namespace App\Http\Controllers;

use App\Models\Profit;
use Illuminate\Http\Request;

class ProfitController extends Controller
{
    public function index()
    {
        $spending = Profit::with('category')->get()->toArray();
        return \Response::json([$spending], 200);
    }

    public function store(Request $request)
    {
        //
    }

    public function update(Request $request, Profit $profit)
    {
        //
    }

    public function destroy(Profit $profit)
    {
        //
    }
}
