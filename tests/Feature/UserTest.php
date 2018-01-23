<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithoutMiddleware;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Models\User;

class UserTest extends TestCase
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
    public function it_can_get_user_By_email()
    {
        $user = create(User::class, [
            'name' => 'John Doe',
            'email' => 'test@test.com'
        ]);

        $response = $this->json('GET', \URL::Route('user.show', $user->email));
        $response->assertStatus(200)->assertJsonFragment(
            [
                'name' => 'John Doe',
                'email' => 'test@test.com'
            ]
        );
    }
}
