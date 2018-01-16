<?php

use Faker\Generator as Faker;
use App\Models\Spending;

$factory->define(Spending::class, function (Faker $faker) {
    return [
        'description' => $faker->sentence,
        'value' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 100, $max = 200),
        'category_id' => 1,
        'user_id' => 1
    ];
});
