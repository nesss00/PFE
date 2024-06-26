<?php

namespace App\Http\Controllers;

use App\Models\TypeCredit;
use App\Http\Requests\StoreTypeCreditRequest;
use App\Http\Requests\UpdateTypeCreditRequest;
use App\Http\Resources\TypeCreditResource;

class TypeCreditController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $typeCredits = TypeCreditResource::collection(TypeCredit::latest()->paginate(10));
        return inertia('typeCredits/Index', [
            'typeCredits' => $typeCredits,
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
     * @param  \App\Http\Requests\StoreTypeCreditRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreTypeCreditRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\TypeCredit  $typeCredit
     * @return \Illuminate\Http\Response
     */
    public function show(TypeCredit $typeCredit)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\TypeCredit  $typeCredit
     * @return \Illuminate\Http\Response
     */
    public function edit(TypeCredit $typeCredit)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateTypeCreditRequest  $request
     * @param  \App\Models\TypeCredit  $typeCredit
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateTypeCreditRequest $request, TypeCredit $typeCredit)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\TypeCredit  $typeCredit
     * @return \Illuminate\Http\Response
     */
    public function destroy(TypeCredit $typeCredit)
    {
        //
    }
}
