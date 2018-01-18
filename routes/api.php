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
Route::get('/spending', 'SpendingController@index')->name('spending.index')->middleware('auth:api');;
Route::post('/spending', 'SpendingController@store')->name('spending.store')->middleware('auth:api');;
Route::delete('/spending/{id}', 'SpendingController@destroy')->name('spending.destroy')->middleware('auth:api');;
Route::put('/spending/{id}', 'SpendingController@update')->name('spending.update')->middleware('auth:api');;

Route::get('/profit', 'ProfitController@index')->name('profit.index')->middleware('auth:api');;
Route::post('/profit', 'ProfitController@store')->name('profit.store')->middleware('auth:api');;
Route::delete('/profit/{id}', 'ProfitController@destroy')->name('profit.destroy')->middleware('auth:api');;
Route::put('/profit/{id}', 'ProfitController@update')->name('profit.update')->middleware('auth:api');;

Route::get('/budget', 'BudgetController@getBudget')->name('budget.getBudget')->middleware('auth:api');;
