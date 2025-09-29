<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\FitnesDnevnikController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function () {

    Route::get('/vezbaci/dnevnici',[UserController::class,'dnevnici']);
     Route::get('/treneri',[UserController::class,'vratiTrenere']);
     Route::delete('/treneri/{id}',[UserController::class,'obrisiTrenera']);
    Route::get('/vezbaci',[UserController::class,'vratiVezbace']);
    Route::delete('/vezbaci/{id}',[UserController::class,'obrisiVezbaca']);

    Route::get('/dnevnici/{id}',[FitnesDnevnikController::class,'show']);
    Route::post('/dnevnici',[FitnesDnevnikController::class,'store']);
    Route::post('/dnevnici/{id}/stavke',[FitnesDnevnikController::class,'dodajStavku']);

    });