<?php
/**
 * Created by PhpStorm.
 * User: dell
 * Date: 13.03.2018
 * Time: 20:07
 */

namespace App\Services;


use App\Models\Assumption;

class AssumptionsService
{
    public function getAssumptionsForSpecificMonth($date)
    {
        //TODO: Pobrać nazwę assumption
        //TODO: Pobra spending z danego zakresu i kategorii i zsumować
        //TODO: Probrac assumptions_category
        //TODO Pobrać budget
        //TODO jeżeli initial value zaznaczone to na podstawie budgetu i percentage value wyliczyć
        $assumptions = Assumption::where('period', $date)->get();
    }
}