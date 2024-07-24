import React, { useState } from 'react';
import Guest from '../Layouts/Guest';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { Card, CardContent, Divider, Slider } from "@mui/material";
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import {Link, useForm} from "@inertiajs/inertia-react";

const steps = ['Select Type de credit', 'Add more details', 'Results', 'Register'];

export default function Home() {
    const [activeStep, setActiveStep] = useState(0);
    const [completed, setCompleted] = useState({});
    const [results, setResults] = useState(null);
    const [formData, setFormData] = useState({
        type: '',
        adGroupName: '',
        adGroupDescription: '',
        projectCost: 0,
        ownContribution: 0,
        netMonthlyIncome: 0,
        otherFinancingInstallments: 0,
        duration: 0,
        adTitle: '',
        adContent: ''
    });
    const {data, setData, post} = useForm({
        name: '', username: '', email: '', password:'',
    })

    const totalSteps = () => steps.length;
    const completedSteps = () => Object.keys(completed).length;
    const isLastStep = () => activeStep === totalSteps() - 1;
    const allStepsCompleted = () => completedSteps() === totalSteps();
    const simulated = () => results !== null;

    const handleNext = () => {
        if (activeStep === steps.length - 1) {
            // If last step is the Register step
            console.log("Ready for registration");
        } else if (activeStep === steps.length - 2) {
            // If penultimate step is Results
            if (!results) {
                simulate();
            } else {
                setActiveStep((prevActiveStep) => prevActiveStep + 1);
            }
        } else {
            const newActiveStep = isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
            setActiveStep(newActiveStep);
        }
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);
    const handleStep = (step) => () => setActiveStep(step);

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
    };

    const handleReset = () => {
        setActiveStep(0);
        setCompleted({});
        setFormData({
            type: '',
            adGroupName: '',
            adGroupDescription: '',
            projectCost: 0,
            ownContribution: 0,
            netMonthlyIncome: 0,
            otherFinancingInstallments: 0,
            duration: 0,
            adTitle: '',
            adContent: ''
        });
        setResults(null);
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleRegisterChange = (e) => setData({...data, [e.target.id]: e.target.value})


    const handleSliderChange = (name) => (event, newValue) => {
        setFormData({
            ...formData,
            [name]: newValue
        });
    };

    const submitHandler = (e) => {
        // console.log(data);
        e.preventDefault()
        post(route('register'), data);
    }

    const simulate = () => {
        axios.post(route('simulate'), formData)
            .then(response => {
                console.log('simulate', response.data)
                setResults(response.data);
                handleComplete();
            })
            .catch(error => {
                console.error(error.response.data.errors);
            });
    };

    const StepContent = ({ step }) => {
        switch (step) {
            case 0:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            select
                            label="Select type"
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        >
                            <MenuItem value="particulier">Particulier</MenuItem>
                            <MenuItem value="entreprise">Entreprise</MenuItem>
                        </TextField>
                        {formData.type === 'particulier' && (
                            <TextField
                                select
                                label="Select type Credit Pour vous"
                                name="typeCredit"
                                value={formData.typeCredit}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="credit1">credit de voiture</MenuItem>
                                <MenuItem value="credit2">credit de immobilier</MenuItem>
                                <MenuItem value="credit3">credit de logement</MenuItem>
                            </TextField>
                        )}
                        {formData.type === 'entreprise' && (
                            <TextField
                                select
                                label="Select type Credit Pour votre entreprise"
                                name="typeCredit"
                                value={formData.typeCredit}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="credit4">credit court terme</MenuItem>
                                <MenuItem value="credit5">credit long terme</MenuItem>
                                <MenuItem value="credit6">credit de consommation</MenuItem>
                            </TextField>
                        )}
                    </Box>
                );
            case 1:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom>Coût du projet</Typography>
                            <Typography gutterBottom>{formData.projectCost}</Typography>
                        </Box>
                        <Slider
                            value={formData.projectCost}
                            onChange={handleSliderChange('projectCost')}
                            valueLabelDisplay="auto"
                            aria-labelledby="project-cost-slider"
                            min={1000}
                            max={500000}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom>Apport Propre</Typography>
                            <Typography gutterBottom>{formData.ownContribution}</Typography>
                        </Box>
                        <Slider
                            value={formData.ownContribution}
                            onChange={handleSliderChange('ownContribution')}
                            valueLabelDisplay="auto"
                            aria-labelledby="own-contribution-slider"
                            min={0}
                            max={49000}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom>Revenu Mensuel Net</Typography>
                            <Typography gutterBottom>{formData.netMonthlyIncome}</Typography>
                        </Box>
                        <Slider
                            value={formData.netMonthlyIncome}
                            onChange={handleSliderChange('netMonthlyIncome')}
                            valueLabelDisplay="auto"
                            aria-labelledby="net-monthly-income-slider"
                            min={0}
                            max={10000}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom>Mensualité pour d’autres Financements</Typography>
                            <Typography gutterBottom>{formData.otherFinancingInstallments}</Typography>
                        </Box>
                        <Slider
                            value={formData.otherFinancingInstallments}
                            onChange={handleSliderChange('otherFinancingInstallments')}
                            valueLabelDisplay="auto"
                            aria-labelledby="other-financing-installments-slider"
                            min={0}
                            max={10000}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography gutterBottom>Durée (mois)</Typography>
                            <Typography gutterBottom>{formData.duration} mois</Typography>
                        </Box>
                        <Slider
                            value={formData.duration}
                            onChange={handleSliderChange('duration')}
                            valueLabelDisplay="auto"
                            aria-labelledby="duration-slider"
                            min={1}
                            max={300}
                        />
                    </Box>
                );
            case 2:
                return results ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography variant="h6">Simulation Results</Typography>
                        {results.map((result, index) => (
                            <Card key={index} sx={{ marginBottom: 2, boxShadow: 3 }}>
                                <CardContent>
                                    <Typography variant="h6" sx={{ marginBottom: 1 }}>
                                        Type de credit: {result.type}
                                    </Typography>
                                    <Divider sx={{ marginBottom: 1 }} />
                                    <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                                        Nom de credit: {result.typeCredit}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                                        Monthly Installment: {result.monthlyInstallment}
                                    </Typography>
                                    <Typography variant="body1" sx={{ marginBottom: 0.5 }}>
                                        Total Cost: {result.totalCost}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                ) : (
                    <Typography variant="h6">No results to display</Typography>
                );
            case 3:
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, padding: 3 }}>
                        <Typography variant="h6" sx={{ marginBottom: 2 }}>Register</Typography>
                        <TextField
                            id="name"
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={data.name}
                            onChange={handleRegisterChange}
                        />
                        <TextField
                            id="username"
                            label="Username"
                            variant="outlined"
                            fullWidth
                            value={data.username}
                            onChange={handleRegisterChange}
                        />
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            fullWidth
                            value={data.email}
                            onChange={handleRegisterChange}
                        />
                        <TextField
                            id="password"
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={data.password}
                            onChange={handleRegisterChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={submitHandler}
                            sx={{ marginTop: 2 }}
                        >
                            Register
                        </Button>
                    </Box>
                );
            default:
                return null;
        }
    };

    return (
        <Guest>
            <Box sx={{ width: '100%', padding: 3 }}>
                <Stepper nonLinear activeStep={activeStep}>
                    {steps.map((step, index) => (
                        <Step key={step} completed={completed[index]}>
                            <StepButton onClick={handleStep(index)}>{step}</StepButton>
                        </Step>
                    ))}
                </Stepper>
                <Box sx={{ marginTop: 3 }}>
                    <StepContent step={activeStep} />
                    <Box sx={{ marginTop: 2 }}>
                        <Button
                            disabled={activeStep === 0}
                            onClick={handleBack}
                            sx={{ marginRight: 1 }}
                        >
                            Back
                        </Button>
                        <Button
                            onClick={activeStep === steps.length - 1 ? handleRegisterChange : handleNext}
                            variant="contained"
                            color="primary"
                        >
                            {isLastStep() ? 'Finish' : 'Next'}
                        </Button>
                        {activeStep === steps.length - 2 && !simulated() && (
                            <Button
                                onClick={simulate}
                                variant="contained"
                                color="secondary"
                                sx={{ marginLeft: 2 }}
                            >
                                Stimulate
                            </Button>
                        )}
                        {activeStep === steps.length - 1 && (
                            <Button
                                onClick={() => Inertia.post(route('register'), registerData)}
                                variant="contained"
                                color="primary"
                                sx={{ marginLeft: 2 }}
                            >
                                Register
                            </Button>
                        )}
                    </Box>
                </Box>
            </Box>
        </Guest>
    );
}

