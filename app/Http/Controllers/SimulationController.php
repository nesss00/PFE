<?php

namespace App\Http\Controllers;

use App\Models\Simulation;
use App\Http\Requests\StoreSimulationRequest;
use App\Http\Requests\UpdateSimulationRequest;

class SimulationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreSimulationRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreSimulationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Simulation  $simulation
     * @return \Illuminate\Http\Response
     */
    public function show(Simulation $simulation)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Simulation  $simulation
     * @return \Illuminate\Http\Response
     */
    public function edit(Simulation $simulation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateSimulationRequest  $request
     * @param  \App\Models\Simulation  $simulation
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateSimulationRequest $request, Simulation $simulation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Simulation  $simulation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Simulation $simulation)
    {
        //
    }
}
