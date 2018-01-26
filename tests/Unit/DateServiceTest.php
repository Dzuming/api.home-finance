<?php

namespace Tests\Unit;

use Tests\TestCase;
use App\Services\DateService;

class DateServiceTest extends TestCase
{
    protected $dateService;

    public function setUp()
    {
        parent::setUp();

        $this->dateService = new DateService;
    }

    public function tearDown()
    {
        parent::tearDown();
    }

    /** @test */
    public function it_can_get_year_from_date()
    {
        $date = '2018-02';
        $year = $this->dateService->getYear($date);
        $this->assertEquals($year, '2018');
    }

    /** @test */
    public function it_can_get_month_from_date()
    {
        $date = '2018-02';
        $month = $this->dateService->getMonth($date);
        $this->assertEquals($month, '02');
    }
}
