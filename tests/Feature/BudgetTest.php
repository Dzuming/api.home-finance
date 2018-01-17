<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Profit;
use App\Models\Spending;
use App\Services\BudgetService;

class BudgetTest extends TestCase
{
    use RefreshDatabase;

    protected $budgetService;

    public function setUp()
    {
        parent::setUp();

        $this->budgetService = new BudgetService;
    }

    public function tearDown()
    {
        parent::tearDown();
    }

    /** @test */
    public function it_can_show_budget()
    {
        create(Profit::class, [
            'value' => '5000.32'
        ]);
        create(Profit::class, [
            'value' => '3200'
        ]);
        create(Profit::class, [
            'value' => '4000.00'
        ]);
        create(Spending::class, [
            'value' => '233.21'
        ]);
        create(Spending::class, [
            'value' => '120.45'
        ]);
        create(Spending::class, [
            'value' => '434.98'
        ]);
        $budget = $this->budgetService->getBudget();

        $this->assertEquals(['budget' => 12988.96], $budget);
    }
}
