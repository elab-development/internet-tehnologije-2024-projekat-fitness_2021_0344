<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vezba;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Auth;
use App\Http\Resources\VezbaResource;
use App\Traits\UploadUtil;
class VezbaController extends Controller
{
    use UploadUtil;
    public function video($id)
    {
        try {
            $fajl = Vezba::findOrFail($id);
            $relativePath = $fajl->video_url;
            $absolutePath = public_path($relativePath);
            Log::info("Putanja do fajla: " . $absolutePath);
            if (!File::exists($absolutePath)) {
                return response()->json(['error' => 'Fajl ne postoji'], 404);
            }
    
            return response()->stream(function () use ($absolutePath) {
                readfile($absolutePath);
            }, 200, [
                'Content-Type' => $fajl->tip,
                'Accept-Ranges' => 'bytes',
                'Content-Length' => filesize($absolutePath),
            ]);
        } catch (\Exception $e) {
            Log::error('Greška prilikom učitavanja audio fajla: ' . $e->getMessage());
            return response()->json(['error' => 'Došlo je do greške prilikom učitavanja audio fajla.'], 500);
        }
    }



    public function index()
    {
        try
        {
            $user = Auth::user();
            if($user->role!='vezbac'){
                return response()->json([
                    'error' => 'Nemate dozvolu za pregled vezbi.',
                ], 403); 
            }
            $vezbe = Vezba::all();
            return VezbaResource::collection($vezbe);

        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju vezba.',
                'message'=>$e->getMessage()
            ], 500); 
        }
    
    }


    public function show($id)
    {

        try
        {

            $vezba = Vezba::findOrFail($id);
            return new VezbaResource($vezba);


        } catch (\Exception $e) {
         
            return response()->json([
                'error' => 'Došlo je do greške pri ucitavanju vezbe.',
                'message'=>$e->getMessage()
            ], 500); 
        }

    

    }


}
