<?php

namespace App\Services;

use App\Models\Spending;
use App\Models\Profit;


class BudgetService
{
    public function getBudget($userId)
    {
        $spending = Spending::where('user_id', $userId)->sum('value');
        $profit = Profit::where('user_id', $userId)->sum('value');
        return [
            'budget' => round($profit - $spending, 2)
        ];
    }
}