<?php

namespace App\Services;

use App\Models\Spending;
use App\Models\Profit;


class BudgetService
{
    public function getBudget()
    {
        $spending = Spending::sum('value');
        $profit = Profit::sum('value');
        return [
            'budget' => $spending + $profit
        ];
    }
}