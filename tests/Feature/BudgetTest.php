<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Profit;
use App\Models\Spending;

class BudgetTest extends TestCase
{
    use RefreshDatabase;

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

        $response = $this->json('GET', \URL::Route('budget.getBudget'));
        $response->assertStatus(200)->assertJson(
            ['budget' => 12988.96]
        );
    }
}
