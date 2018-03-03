<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Profit;
use App\Models\Spending;
use App\Services\BudgetService;

class BudgetServiceTest extends TestCase
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
            'user_id' => 1,
            'value' => '5000.32'
        ]);
        create(Profit::class, [
            'user_id' => 1,
            'value' => '3200'
        ]);
        create(Profit::class, [
            'user_id' => 1,
            'value' => '4000.00'
        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '233.21'
        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '120.45'
        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '434.98'
        ]);
        $userId = 1;
        $budget = $this->budgetService->getBudget($userId);

        $this->assertEquals(['budget' => 11411.68], $budget);
    }
}
