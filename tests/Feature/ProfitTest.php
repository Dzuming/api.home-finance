<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Profit;
use App\Models\Category;

class ProfitTest extends TestCase
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
    public function it_can_show_profit()
    {
        create(Category::class, [
            'name' => 'Zakupy',
        ]);
        create(Profit::class, [
            'category_id' => 1,
            'description' => 'Pensja',
            'value' => '5000.32',
            'created_at' => '2018-01-22 12:12:12'
        ]);
        create(Profit::class, [
            'category_id' => 1,
            'description' => 'Pensja',
            'value' => '3200',
            'created_at' => '2018-01-22 12:12:12'
        ]);
        create(Profit::class, [
            'category_id' => 1,
            'description' => 'Pensja',
            'value' => '4000',
            'created_at' => '2018-01-22 12:12:12'
        ]);

        $userId = 1;
        $date = '2018-01';
        $response = $this->json('GET', \URL::Route('profit.index', [$userId, $date]));
        $response->assertStatus(200)->assertJsonFragment(
            [
                'description' => 'Pensja',
                'value' => '5000.32',
                'description' => 'Pensja',
                'value' => '3200',
                'description' => 'Pensja',
                'value' => '4000'
            ]
        );
    }

    /** @test */
    public function it_can_add_profit()
    {
        $profit = [
            'category_id' => 1,
            'user_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'
        ];
        $response = $this->json('Post', \URL::Route('profit.store', $profit));
        $response->assertStatus(200);
        $this->assertDatabaseHas('profits', $profit);
    }

    /** @test */
    public function it_can_remove_profit()
    {
        $profit = [
            'category_id' => 1,
            'user_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'
        ];
        create(profit::class, $profit);
        $response = $this->json('Delete', \URL::Route('profit.destroy', 1));
        $response->assertStatus(200);
        $this->assertDatabaseMissing('profits', $profit);
    }

    /** @test */
    public function it_can_edit_profit()
    {
        create(Profit::class);

        $input = [
            'category_id' => 1,
            'description' => 'Zakupy biedronka',
            'value' => '33.24'
        ];
        $id = 1;
        $response = $this->json('put', \URL::Route('profit.update', $input, $id));
        $response->assertStatus(200);
        $this->assertDatabaseHas('profits', $input);
    }

}
