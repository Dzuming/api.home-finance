<?php

namespace App\Http\Controllers;

use App\Models\Profit;
use Illuminate\Http\Request;
use App\Http\Requests\ProfitRequest;

class ProfitController extends Controller
{
    public function index()
    {
        $spending = Profit::with('category')->get()->toArray();
        return \Response::json([$spending], 200);
    }

    public function store(ProfitRequest $request)
    {
        $input = $request->all();
        Profit::create($input);
        return \Response::json('Zapis przychodu do bazy zakończył się powodzeniem', 200);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        Profit::find($id)->update($input);
        return \Response::json('wyedytowano pzychód o id' . $id, 200);
    }

    public function destroy($id)
    {
        Profit::destroy($id);
        return \Response::json('usunięto z bazy przychód o id' . $id, 200);
    }
}
