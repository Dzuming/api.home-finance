<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Spending;
use App\Http\Requests\SpendingRequest;

class SpendingController extends Controller
{
    public function index()
    {
        $spending = Spending::with('category')->get()->toArray();
        return \Response::json([$spending], 200);
    }

    public function store(SpendingRequest $request)
    {
        $input = $request->all();
        Spending::create($input);
        return \Response::json('Zapis wydatku do bazy zakończył się powodzeniem', 200);
    }

    public function destroy($id)
    {
        Spending::destroy($id);
        return \Response::json('usunięto z bazy wydatek o id' . $id, 200);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        Spending::find($id)->update($input);
        return \Response::json('wyedytowano wydatek o id' . $id, 200);
    }
}
