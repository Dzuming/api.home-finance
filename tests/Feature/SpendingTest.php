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
    public function it_can_show_users()
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
        
        $response = $this->json('GET', \URL::Route('spending.getSpendings'));
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
}
