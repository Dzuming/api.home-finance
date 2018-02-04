<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Spending;
use App\Models\Category;

class SpendingTest extends TestCase
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
    public function it_can_show_spending_by_specific_date_and_user()
    {
        create(Category::class, [
            'id' => 1,
            'name' => 'Zakupy',
        ]);
        create(Spending::class, [
            'category_id' => 1,
            'user_id' => 1,
            'created_at' => '2018-01-22 12:12:12'
        ]);
        create(Spending::class, [
            'category_id' => 2,
            'user_id' => 2,
            'created_at' => '2018-01-22 11:12:12'
        ]);
        create(Spending::class, [
            'category_id' => 1,
            'user_id' => 1,
            'created_at' => '2017-01-22 12:12:12'
        ]);

        create(Spending::class, [
            'category_id' => 1,
            'user_id' => 1,
            'created_at' => '2017-01-22 12:12:12'

        ]);
        $userId = 1;
        $date = '2018-01';
        $response = $this->json('GET', \URL::Route('spending.index', [$userId, $date]));
        $response->assertStatus(200)->assertJsonMissing([
            'category_id' => 2,
            'user_id' => 2,
            'created_at' => '2018-01-22 11:12:12'
        ]);
        $response->assertStatus(200)->assertJson(
            [
                [
                    'category_id' => "1",
                    'user_id' => "1",
                    'created_at' => '2018-01-22 12:12:12'
                ]
            ]
        );
    }

    /** @test */
    public function it_can_add_spending()
    {
        create(Category::class, [
            'id' => 1,
            'name' => 'Zakupy',
        ]);
        $spending = [
            'category_id' => 1,
            'user_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24',
            'created_at' => '2018-01-01 00:00:00'
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
            'user_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'
        ];
        create(Spending::class, $spending);
        $response = $this->json('Delete', \URL::Route('spending.destroy', 1));
        $response->assertStatus(200);
        $this->assertDatabaseMissing('spendings', $spending);
    }

    /** @test */
    public function it_can_edit_spending()
    {
        create(Spending::class);

        $input = [
            'category_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'
        ];
        $id = 1;
        $response = $this->json('put', \URL::Route('spending.update', $input, $id));
        $response->assertStatus(200);
        $this->assertDatabaseHas('spendings', $input);
    }
}
