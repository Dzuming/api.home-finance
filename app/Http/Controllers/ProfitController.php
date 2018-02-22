<?php

namespace App\Http\Controllers;

use App\Services\DateService;
use App\Models\Profit;
use Illuminate\Http\Request;
use App\Http\Requests\ProfitRequest;

class ProfitController extends Controller
{
    protected $dateService;

    public function __construct(DateService $dateService)
    {
        $this->dateService = $dateService;
    }

    public function index($id, $date)
    {
        $profit = Profit::with('category')
            ->where('user_id', $id)
            ->whereYear('created_at', $this->dateService->getYear($date))
            ->whereMonth('created_at', $this->dateService->getMonth($date))
            ->get()
            ->toArray();
        return \Response::json($profit, 200);
    }

    public function store(ProfitRequest $request)
    {
        $input = $request->all();
        $newProfit= Profit::create($input);
        $newProfitId = $newProfit->id;
        return \Response::json([
            'message' => 'Zapis wydatku do bazy zakończył się powodzeniem',
            'profit' => Profit::with('category')->find($newProfitId)
        ], 200);
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
