<?php

namespace App\Http\Controllers;

class PoolController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }



    public function findPool()
    {
        return response()
            ->json(['group_name' => 'Abigail', 'state' => 'CA']);

    }

}
