<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 10.03.2018
 * Time: 23:25
 */

namespace App\Services;


use App\Models\Profit;
use App\Models\Spending;

class RevenueService
{
    private $dateService;

    public function __construct(DateService $dateService)
    {
        $this->dateService = $dateService;
    }

    public function getRevenue($userId, $date)
    {
        $spending = Spending::where('user_id', $userId)
            ->whereYear('created_at', $this->dateService->getYear($date))
            ->whereMonth('created_at', $this->dateService->getMonth($date))
            ->sum('value');

        $profit = Profit::where('user_id', $userId)
            ->whereYear('created_at', $this->dateService->getYear($date))
            ->whereMonth('created_at', $this->dateService->getMonth($date))
            ->sum('value');
        return [
            'revenue' => round($profit - $spending, 2)
        ];
    }
}