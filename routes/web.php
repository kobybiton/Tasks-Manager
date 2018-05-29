<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');

Route::get('/', 'TasksController@index');
Route::get('get_tasks', 'TasksController@create');
Route::post('create_task', 'TasksController@store');
Route::post('update_task/{id}', 'TasksController@update');
Route::post('checked_task/{id}', 'TasksController@checked');
Route::post('delete_task/{id}', 'TasksController@destroy');