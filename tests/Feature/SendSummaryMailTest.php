<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Support\Facades\Mail;
use App\Mail\SummaryMail;

class SendSummaryMailTest extends TestCase
{
    public function setUp()
    {
        parent::setUp();
    }

    public function tearDown()
    {
        parent::tearDown();
    }

    /** @test */
    public function it_can_send_summary_email_to_user()
    {
        //TODO: send email every month
        Mail::fake();
        $mailable = new SummaryMail();
        Mail::to('test@test.com')->send($mailable);
        Mail::assertSent(SummaryMail::class, 1);;
    }
}
