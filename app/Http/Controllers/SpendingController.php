<?php

namespace App\Http\Controllers;

use App\Services\DateService;
use Illuminate\Http\Request;
use App\Models\Spending;
use App\Http\Requests\SpendingRequest;

class SpendingController extends Controller
{

    protected $dateService;

    public function __construct(DateService $dateService)
    {
        $this->dateService = $dateService;
    }

    public function index($id, $date)
    {

        $spending = Spending::with('category')
            ->where('user_id', $id)
            ->whereYear('created_at', $this->dateService->getYear($date))
            ->whereMonth('created_at', $this->dateService->getMonth($date))
            ->get()
            ->toArray();
        return \Response::json($spending, 200);

    }

    public function store(SpendingRequest $request)
    {
        $input = $request->all();
        $newSpending = Spending::create($input);
        $newSpendingId = $newSpending->id;
        return \Response::json(
            [
                'message' => 'Zapis wydatku do bazy zakończył się powodzeniem',
                'spending' => Spending::with('category')->find($newSpendingId)
            ], 200);
    }

    public function destroy($id)
    {
        Spending::destroy($id);
        return \Response::json('usunięto z bazy wydatek o id' . $id, 200);
    }

    public function update(Request $request, $id)
    {
        $input = $request->all();
        \Log::info($input);
        Spending::find($id)->update($input);
        return \Response::json('wyedytowano wydatek o id' . $id, 200);
    }
}
