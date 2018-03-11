<?php

namespace App\Http\Controllers;

use App\Services\DateService;
use App\Services\RevenueService;
use Illuminate\Http\Request;

class RevenueController extends Controller
{

    protected $dateService;
    protected $revenueService;

    public function __construct(DateService $dateService, RevenueService $revenueService)
    {
        $this->dateService = $dateService;
        $this->revenueService = $revenueService;
    }

    public function getRevenue($userId, $date)
    {
        return \Response::json($this->revenueService->getRevenue($userId, $date), 200);
    }
}
