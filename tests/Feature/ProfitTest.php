<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\Profit;
use App\Models\Category;

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
    public function it_can_show_profit()
    {
        create(Category::class, [
            'name' => 'Zakupy',
        ]);
        create(Profit::class, [
            'category_id' => 1,
            'description' => 'Pensja',
            'value' => '5000.32'
        ]);
        create(Profit::class, [
            'category_id' => 1,
            'description' => 'Pensja',
            'value' => '3200'
        ]);
        create(Profit::class, [
            'category_id' => 1,
            'description' => 'Pensja',
            'value' => '4000'
        ]);

        $response = $this->json('GET', \URL::Route('profit.index'));
        $response->assertStatus(200)->assertJsonFragment(
            [
                'description' => 'Pensja',
                'value' => '5000.32'
            ],
            [
                'description' => 'Pensja',
                'value' => '3200'
            ],
            [
                'description' => 'Pensja',
                'value' => '4000'
            ]
        );
    }
}
