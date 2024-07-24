<?php

namespace App\Http\Controllers;

use App\Http\Resources\SimulationResource;
use App\Models\Result;
use App\Models\Simulation;
use App\Http\Requests\StoreSimulationRequest;
use App\Http\Requests\UpdateSimulationRequest;
use App\Models\TypeCredit;
use Illuminate\Http\Request;

class SimulationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $userId = auth()->id(); // Get the authenticated user's ID

        // Retrieve simulations associated with the authenticated user
        $simulation = SimulationResource::collection(Simulation::where('user_id', $userId)->latest()->paginate(10));

        return inertia('Simulation/Index', [
            'simulation' => $simulation,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        // Validate request data
        $request->validate([
            'type' => 'required|string',
            'typeCredit' => 'required|string',
            'projectCost' => 'required|integer',
            'ownContribution' => 'required|integer',
            'netMonthlyIncome' => 'required|integer',
            'otherFinancingInstallments' => 'required|integer',
            'duration' => 'required|integer',
        ]);

        // Perform simulation logic to find the best two credits
        // This is a placeholder for the actual simulation logic
        $duration = $request->duration;
        $duration = (int) $request->duration;
        $money = $request->projectCost - $request->ownContribution;



        // find all of the type credits
        $typeCredits = TypeCredit::all();

        // find the best two credits
        $simulations = [];
        foreach ($typeCredits as $typeCredit) {
            $creditInstallment = $money / $duration;
            $creditInstallment += $creditInstallment * $typeCredit->TauxInteret / 100;
            $totalCost = $creditInstallment * $duration;
            if ($money < $typeCredit->max_money_credited && $duration <= $typeCredit->DuréeMax) {
                $simulations[] = [
                    'type' => $request->type,
                    'typeCredit' => $typeCredit->name,
                    'monthlyInstallment' => $creditInstallment,
                    'totalCost' => $totalCost,
                    'institution' => $typeCredit->institution->name,
                    'TauxInteret' => $typeCredit->TauxInteret,
                ];
            }
        }

        // eliminate the credit options that are not feasible
        $simulations = array_filter($simulations, function ($simulation) {
            return $simulation['monthlyInstallment'] > 0;
        });

        // sort the credit options by monthly installment
        usort($simulations, function ($a, $b) {
            return $a['monthlyInstallment'] - $b['monthlyInstallment'];
        });

        // sort by intrest rate
        usort($simulations, function ($a, $b) {
            return $a['TauxInteret'] - $b['TauxInteret'];
        });

        // return the best two credit options
        $simulations = array_slice($simulations, 0, 2);
        $userId = auth()->id();
        dd($userId);
        // Get the authenticated user's ID
        # Save the simulation
        $simulation = new Simulation();

        $simulation->user_id = $userId;

        # give it a generated name like simulation 1 etc
        $simulation->name = 'Simulation ' . rand(1, 1000);
        $simulation->date = now();
        $simulation->montant_emprunte = $money;
        $simulation->duree = $duration;
        $simulation->taux_interet = $simulations[0]['TauxInteret'];

        # save the simulation
        $simulation->save();

        #save the results
        foreach ($simulations as $sim) {
            $result = new Result();
            $result->simulation_id = $simulation->id;
            $result->type_credit_id = TypeCredit::where('name', $sim['typeCredit'])->first()->id;
            $result->save();
        }


        return response()->json($simulations);
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
