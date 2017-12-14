<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Category;
use App\Models\Spending;

class SpendingTest extends TestCase
{
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();
    }

    public function tearDown(){
        parent::tearDown();
    }

    /** @test */
    public function it_can_get_category_that_owns_spendings()
    {
        $newCategory = create(Category::class, [
            'id' => 1,
            'name' => 'Zakupy',
        ]);
        
        $newSpending = create(Spending::class, [
            'category_id' => 1,
            'description' => 'Rachunek gaz',
            'value' => '22'
        ]);
        
        $spending = $newSpending::with('category')->get()->toArray();
        
        $this->assertEquals('Zakupy', $spending[0]['category']['name']);

    }
}
