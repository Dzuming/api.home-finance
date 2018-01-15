<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::get('/spendings', 'SpendingController@index')->name('spending.index');
Route::post('/spendings', 'SpendingController@store')->name('spending.store');
Route::delete('/spendings/{id}', 'SpendingController@destroy')->name('spending.destroy');
Route::put('/spendings/{id}', 'SpendingController@update')->name('spending.update');
