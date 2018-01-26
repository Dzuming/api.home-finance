<?php

namespace App\Services;

use Carbon\Carbon;

class DateService
{
    public function getYear($date)
    {
        return (string)Carbon::parse($date)->year;
    }

    public function getMonth($date)
    {
        $monthWithLeadingZero = date("m", strtotime($date));
        return $monthWithLeadingZero;
    }
}