<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;

class UserController extends Controller
{
    public function show($email) {
        $user = User::where('email', $email)->get();
        return \Response::json([$user], 200);
    }
}
