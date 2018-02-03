<?php

namespace Tests\Feature;

use App\Models\Category;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryTest extends TestCase
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
    public function it_can_get_all_categories()
    {
        create(Category::class, [
            'id' => 1,
            'name' => 'jedzenie'
        ]);
        create(Category::class, [
            'id' => 2,
            'name' => 'rachunki'
        ]);

        $response = $this->json('GET', \URL::Route('category.getCategories'));
        $response->assertStatus(200)->assertJson(
            [
                [
                    'id' => 1,
                    'name' => 'jedzenie'
                ],
                [
                    'id' => 2,
                    'name' => 'rachunki'
                ]
            ]

        );
    }
}
