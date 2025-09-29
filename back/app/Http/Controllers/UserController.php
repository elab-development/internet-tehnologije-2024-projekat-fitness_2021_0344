<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\FitnesDnevnik;
use App\Http\Resources\FitnesDnevnikResource;
use App\Http\Resources\UserResource;
use App\Models\User;
class UserController extends Controller
{
    public function dnevnici()
    {
        try
        {
            $user = Auth::user();
            if($user->role!='vezbac'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled dnevnika.',
                ], 403); 
            }

            $korisnikId = $user->id;
            $dnevnici = FitnesDnevnik::where('vezbac_id', $korisnikId)
            ->orderBy('created_at', 'desc')
            ->paginate(10);
            return FitnesDnevnikResource::collection($dnevnici);
        }catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju dnevnika.',
            ], 500); 
        }
    }



    
}
