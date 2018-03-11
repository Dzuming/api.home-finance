<?php

namespace Tests\Feature;

use App\Models\Profit;
use App\Models\Spending;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RevenueTest extends TestCase
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
    public function it_can_get_revenue_from_specific_period()
    {
        create(Profit::class, [
            'user_id' => 1,
            'value' => '500',
            'created_at' => '2018-03-02 11:11:11'
        ]);
        create(Profit::class, [
            'user_id' => 1,
            'value' => '2000',
            'created_at' => '2018-03-02 11:11:11'
        ]);
        create(Profit::class, [
            'user_id' => 1,
            'value' => '2000',
            'created_at' => '2018-02-02 11:11:11'
        ]);
        create(Profit::class, [
            'user_id' => 2,
            'value' => '4000.00',
            'created_at' => '2018-03-02 11:11:11'

        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '300',
            'created_at' => '2018-03-02 11:11:11'
        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '200',
            'created_at' => '2018-03-02 11:11:11'
        ]);
        create(Spending::class, [
            'user_id' => 1,
            'value' => '200',
            'created_at' => '2018-02-02 11:11:11'
        ]);
        create(Spending::class, [
            'user_id' => 2,
            'value' => '600',
            'created_at' => '2018-03-02 11:11:11'
        ]);

        $response = $this->json('GET', \URL::Route('budget.getRevenue', [1, '2018-03']));
        $response->assertStatus(200)->assertJson(
            ['revenue' => 2000]
        );
    }
}
