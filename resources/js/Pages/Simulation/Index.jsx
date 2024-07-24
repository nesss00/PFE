import { Link } from '@inertiajs/inertia-react';
import React, { useState } from 'react'
import Dialog from '../../Components/Dashboard/Dialog';
import Base from '../../Layouts/Base'
import useDialog from '../../Hooks/useDialog';
import Create from '../../Components/Dashboard/Simulation/Create';
import { Inertia } from '@inertiajs/inertia';
import {Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";

export default function Index(props) {
    console.log('props', props)
    const {data: simulation, links, meta} = props.simulation;
    const [edit, setEdit] = useState(false);
    const [state, setState] = useState([])
    const [addDialogHandler, addCloseTrigger,addTrigger] = useDialog()
    const [ViewDialogHandler, ViewCloseTrigger,ViewTrigger] = useDialog()
    const [destroyDialogHandler, destroyCloseTrigger,destroyTrigger] = useDialog()
    const [simulationResults, setSimulationResults] = useState([]);
    const [bestResult, setBestResult] = useState({
        monthlyFee: 0,
        totalCost: 0,
        typeCredit: {
            TypeCredit: '',
            TauxInteret: 0,
            institution: {
                name: ''
            }
        }
    });


    const calculateMonthlyFee = (principal, annualRate, durationMonths) => {
        const monthlyRate = annualRate / 100 / 12;
        return (principal * monthlyRate * Math.pow(1 + monthlyRate, durationMonths)) / (Math.pow(1 + monthlyRate, durationMonths) - 1);
    };

    const calculateTotalCost = (monthlyFee, durationMonths) => {
        return monthlyFee * durationMonths;
    };
    const ViewUpdateDialog = (sim) => {
        setState(sim);
        console.log('sim', sim)

        const { montant_emprunte, duree, taux_interet, results } = state;
        const loanAmount = parseFloat(montant_emprunte);
        const loanDuration = duree;

        const simulationResults = results.map(result => {
            console.log('result', result)
            const annualRate = parseFloat(result.typeCredit.TauxInteret);
            const monthlyFee = calculateMonthlyFee(loanAmount, annualRate, loanDuration);
            const totalCost = calculateTotalCost(monthlyFee, loanDuration);
            return {
                ...result,
                monthlyFee,
                totalCost
            };
        });

        console.log('simulationResults', simulationResults)
        setSimulationResults(simulationResults);
        const bestResults = simulationResults.reduce((prev, current) => (prev.totalCost < current.totalCost ? prev : current));
        setBestResult(bestResults);
        console.log('bestResults', bestResults)
        ViewDialogHandler()
    }

    const openDestroyDialog = (typeCredit) => {
        setState(typeCredit);
        destroyDialogHandler()
    };

    const destroyUser = () => {
        Inertia.delete(
            route('typecredit.destroy', state.id),
            { onSuccess: () => destroyCloseTrigger() });
    }

    return (
        <>
            <div className="container-fluid py-4">
                <Dialog trigger={addTrigger} title="Create New User">
                    <Create close={addCloseTrigger}></Create>
                </Dialog>

                <Dialog trigger={ViewTrigger} title={`View Simulation: ${state.name}`}>
                    {simulationResults && state ? <div>
                        {simulationResults.map((result, index) => (
                            <Card key={index} style={{marginBottom: '20px'}}>
                                <CardContent>
                                    <Typography variant="h6">{result.typeCredit.TypeCredit}</Typography>
                                    <Typography>Institution: {result.typeCredit.institution.name}</Typography>
                                    <Typography>Annual Interest Rate: {result.typeCredit.TauxInteret}%</Typography>
                                    <Typography>Monthly Fee: {result.monthlyFee.toFixed(2)}</Typography>
                                    <Typography>Total Cost: {result.totalCost.toFixed(2)}</Typography>
                                </CardContent>
                            </Card>
                        ))}
                        <Typography variant="h5" style={{marginTop: '20px'}}>Best Option</Typography>
                        {bestResult && state ? <Card>
                            <CardContent>
                                <Typography variant="h6">{bestResult.typeCredit.TypeCredit}</Typography>
                                <Typography>Institution: {bestResult.typeCredit.institution.name}</Typography>
                                <Typography>Annual Interest Rate: {bestResult.typeCredit.TauxInteret}%</Typography>
                                <Typography>Monthly Fee: {bestResult.monthlyFee.toFixed(2)}</Typography>
                                <Typography>Total Cost: {bestResult.totalCost.toFixed(2)}</Typography>
                            </CardContent>
                        </Card> : ''}
                    </div> : ''}
                </Dialog>

                <Dialog trigger={destroyTrigger} title={`Delete simulation: ${state.name}`}>
                    <p>Are you sure to delete this user ?</p>
                    <div className="modal-footer">
                        <button type="button" className="btn bg-gradient-secondary" data-bs-dismiss="modal">Close
                        </button>
                        <button type="submit" onClick={destroyUser} className="btn bg-gradient-danger">Delete</button>
                    </div>
                </Dialog>

                <div className="row pb-4">
                    <div className="col-12 w-100">
                        <div className="card h-100 w-100">
                            <div className="card-header pb-0">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>simulation table</h6>
                                    </div>
                                    <div className="col-md-6 d-flex justify-content-end">
                                        <button onClick={addDialogHandler} type="button"
                                                className="btn bg-gradient-success btn-block mb-3"
                                                data-bs-toggle="modal" data-bs-target="#exampleModalMessage">
                                            Create New simulation
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="card-body px-0 pt-0 pb-2">
                            <div className="table-responsive-xxl p-0" width="100%">
                                <table className="table align-items-center justify-content-center mb-0" width="100%">
                                    <thead>
                                    <tr>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 text-centter">#</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">Name</th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder opacity-7 ps-2 text-left">date
                                            Credit
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">duree
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">taux_interet
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">montant_emprunte
                                        </th>
                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-left opacity-7 ps-2">results
                                        </th>

                                        <th className="text-uppercase text-secondary text-xxs font-weight-bolder text-center opacity-7 ps-2">Actions</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {simulation.map((simulatio, index) => (
                                        <tr key={simulatio.id}>
                                            <td className='text-center'>{meta.from + index}</td>
                                            <td className='text-left'>
                                                <div className="d-flex px-2">

                                                    <div className="my-auto">
                                                        <h6 className="mb-0 text-sm">{simulatio.name}</h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className='text-left'>
                                                <p className="text-sm font-weight-bold mb-0">{simulatio.date}</p>
                                            </td>
                                            <td className='text-left'>
                                                <span
                                                    className="text-xs font-weight-bold">{simulatio.duree}</span>
                                            </td>
                                            <td className="align-middle text-left">
                                                <div className="d-flex align-items-center text-left">
                                                    <span
                                                        className="text-xs font-weight-bold mb-0">{simulatio.taux_interet}</span>
                                                </div>
                                            </td>
                                            <td className="align-middle text-left">
                                                <div className="d-flex align-items-center text-left">
                                                    <span
                                                        className="text-xs font-weight-bold mb-0">{simulatio.montant_emprunte}</span>
                                                </div>
                                            </td>
                                            <td className="align-middle text-left">
                                                <div className="d-flex align-items-center text-left">
                                                    <span
                                                        className="text-xs font-weight-bold mb-0">{simulatio.results.length}</span>
                                                </div>
                                            </td>
                                            <td className="align-middle text-center" width="10%">
                                                <div>
                                                    <button type="button" onClick={() => ViewUpdateDialog(simulatio)}
                                                            className="btn btn-vimeo btn-icon-only mx-2">
                                                        <span className="btn-inner--icon"><i
                                                            className="fas fa-eye"></i></span>
                                                    </button>
                                                    <button type="button" onClick={() => openDestroyDialog(simulatio)}
                                                            className="btn btn-youtube btn-icon-only">
                                                        <span className="btn-inner--icon"><i
                                                            className="fas fa-trash"></i></span>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                <nav aria-label="Page navigation example">
                    <ul className="pagination justify-content-center">
                        {meta.links.map((link, k) => (
                            <li key={k} className="page-item">
                                <Link disabled={link.url == null ? true : false} as="button" className={`${link.active && 'bg-info'} ${link.url == null && 'btn bg-gradient-secondary text-white'} page-link`} href={link.url || ''} dangerouslySetInnerHTML={{ __html: link.label }}/>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </>
    )
}

Index.layout = (page) => <Base key={page} children={page} title={"Manage Simulations"}/>
