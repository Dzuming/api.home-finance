<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;
use App\Models\Profit;

class ProfitTest extends TestCase
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
    public function it_can_get_category_that_owns_profit()
    {
        create(Category::class, [
            'id' => 1,
            'name' => 'Zakupy',
        ]);

        $newProfit = create(Profit::class, [
            'category_id' => 1,
            'description' => 'Rachunek gaz',
            'value' => '22'
        ]);

        $spending = $newProfit::with('category')->get()->toArray();

        $this->assertEquals('Zakupy', $spending[0]['category']['name']);

    }
}
