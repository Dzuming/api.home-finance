<?php

namespace Tests\Unit;

use Tests\TestCase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Foundation\Testing\RefreshDatabase;
use App\Http\Requests\SpendingRequest;

class ValidationTest extends TestCase
{
    use RefreshDatabase;

    public function setUp()
    {
        parent::setUp();

        $this->rules     = (new SpendingRequest())->rules();
        $this->validator = $this->app['validator'];
    }

    public function tearDown(){
        parent::tearDown();
    }

    /** @test */
    public function it_can_validate_spending_post()
    {
        $this->assertTrue($this->validateField('description', 'Zakupy tesco'));
        $this->assertTrue($this->validateField('category_id', 1));
        $this->assertFalse($this->validateField('category_id', "eeq"));
        $this->assertTrue($this->validateField('user_id', 1));
        $this->assertFalse($this->validateField('user_id', "yry"));
        $this->assertTrue($this->validateField('value', 22));
        $this->assertFalse($this->validateField('value', "wrw"));
    }

    protected function getFieldValidator($field, $value)
    {
        return $this->validator->make(
            [$field => $value], 
            [$field => $this->rules[$field]]
        );
    }
    
    protected function validateField($field, $value)
    {
        return $this->getFieldValidator($field, $value)->passes();
    }
}
