<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\BudgetService;

class BudgetController extends Controller
{
    protected $budgetService;

    public function __construct(BudgetService $budgetService)
    {
        $this->budgetService = $budgetService;
    }

    public function getBudget()
    {
        $budget = $this->budgetService->getBudget();
        return \Response::json($budget, 200);
    }
}