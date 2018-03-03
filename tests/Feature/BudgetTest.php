<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Profit;
use App\Models\Spending;

class BudgetTest extends TestCase
{
    use RefreshDatabase;
    use WithoutMiddleware;

    public function setUp()
    {
        parent::setUp();

    }

    public function tearDown()
    {
        parent::tearDown();
    }

    /** @test */
    public function it_can_get_budget()
    {
        create(Profit::class, [
            'user_id' => 1,
            'value' => '5000.35'
        ]);
        create(Profit::class, [
            'user_id' => 1,
            'value' => '3200'
        ]);
        create(Profit::class, [
            'user_id' => 2,
            'value' => '4000.00'
        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '233.20'
        ]);
        create(Spending::class, [
            'user_id' => 2,
            'value' => '120.45'
        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '434.95'
        ]);

        $response = $this->json('GET', \URL::Route('budget.getBudget', [1]));
        $response->assertStatus(200)->assertJson(
            ['budget' => 7532.2]
        );
    }
}
