<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Spending;
use App\Models\Category;

class SpendingTest extends TestCase
{
    use RefreshDatabase;

    /** @test */
    public function it_can_show_spendings()
    {
        create(Category::class, [
            'name' => 'Zakupy',
        ]);
        create(Spending::class, [
            'category_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'
        ]);
        create(Spending::class, [
            'category_id' => 1,
            'description' => 'Rachunek gaz',
            'value' => '22'
        ]);
        create(Spending::class, [
            'category_id' => 1,
            'description' => 'Zakupy aldi',
            'value' => '22'
        ]);
        
        $response = $this->json('GET', \URL::Route('spending.index'));
        $response->assertStatus(200)->assertJsonFragment(
                [
                    'description' => 'Zakupy biedronka',
                    'value' => '33.24'
                ],
                [
                    'description' => 'Rachunek gaz',
                    'value' => '22'
                ],
                [
                    'description' => 'Zakupy aldi',
                    'value' => '22'
                ]
        );
    }

    /** @test */
    public function it_can_add_spending()
    {
        $spending = [
            'category_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'    
        ];
        $response = $this->json('Post', \URL::Route('spending.store', $spending));
        $response->assertStatus(200);
        $this->assertDatabaseHas('spendings', $spending);
    }
    
    /** @test */
    public function it_can_remove_spending()
    {
        $spending = [
            'category_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'    
        ];
        create(Spending::class, $spending);
        $response = $this->json('Delete', \URL::Route('spending.destroy', 1));
        $response->assertStatus(200);
        $this->assertDatabaseMissing('spendings', $spending);
    }
}
