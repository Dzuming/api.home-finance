<?php

use Faker\Generator as Faker;

$factory->define(App\Models\Profit::class, function (Faker $faker) {
    return [
        'description' => $faker->sentence,
        'value' => $faker->randomFloat($nbMaxDecimals = NULL, $min = 100, $max = 200),
        'category_id' => 1,
        'user_id' => 1
    ];
});
