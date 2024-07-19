<?php

namespace App\Http\Controllers;

use App\Models\Result;
use App\Models\Simulation;
use App\Models\TypeCredit;
use Illuminate\Http\Request;

class CreditSimulationUserController extends Controller
{
    public function simulateuser(Request $request): \Illuminate\Http\JsonResponse
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

        # Save the simulation
        $simulation = new Simulation();
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
}