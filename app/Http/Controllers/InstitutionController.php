<?php

namespace App\Http\Controllers;

use App\Http\Resources\InstitutionResource;
use App\Models\Institution;
use App\Http\Requests\StoreInstitutionRequest;
use App\Http\Requests\UpdateInstitutionRequest;

class InstitutionController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $vehicles = InstitutionResource::collection(Institution::latest()->paginate(10));
        // Return a collection of $vehicles with pagination
        // inertia response
        return Inertia('Institution/Index', [
            'institutions' => $vehicles,
        ]);
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
     * @param  \App\Http\Requests\StoreInstitutionRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreInstitutionRequest $request)
    {
        $attr = $request->toArray();


        Institution::create($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'Vehicle has been created',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function show(Institution $institution)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function edit(Institution $institution)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateInstitutionRequest  $request
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateInstitutionRequest $request, Institution $institution)
    {
        $attr = $request->toArray();

        $institution->update($attr);

        return back()->with([
            'type' => 'success',
            'message' => 'vehicule has been updated',
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Institution  $institution
     * @return \Illuminate\Http\Response
     */
    public function destroy(Institution $institution)
    {
        $institution->delete();

        return back()->with([
            'type' => 'success',
            'message' => 'vehicule has been deleted',
        ]);
    }
}
