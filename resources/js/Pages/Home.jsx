import React from 'react';
import Guest from '../Layouts/Guest';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import {Slider} from "@mui/material";

const steps = ['Select campaign settings', 'Create an ad group', 'Create an ad'];

export default function Home() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [completed, setCompleted] = React.useState({});
    const [formData, setFormData] = React.useState({
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

    const totalSteps = () => steps.length;

    const completedSteps = () => Object.keys(completed).length;

    const isLastStep = () => activeStep === totalSteps() - 1;

    const allStepsCompleted = () => completedSteps() === totalSteps();

    const handleNext = () => {
        const newActiveStep =
            isLastStep() && !allStepsCompleted()
                ? steps.findIndex((step, i) => !(i in completed))
                : activeStep + 1;
        setActiveStep(newActiveStep);
    };

    const handleBack = () => setActiveStep((prevActiveStep) => prevActiveStep - 1);

    const handleStep = (step) => () => setActiveStep(step);

    const handleComplete = () => {
        const newCompleted = completed;
        newCompleted[activeStep] = true;
        setCompleted(newCompleted);
        handleNext();
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
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSliderChange = (name) => (event, newValue) => {
        setFormData({
            ...formData,
            [name]: newValue
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
                                name="type"
                                value={formData.typeCredit}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="particulier">Credit 1</MenuItem>
                                <MenuItem value="entreprise">Credit 2</MenuItem>
                            </TextField>) }
                        {formData.type === 'entreprise' && (
                            <TextField
                                select
                                label="Select type Credit Pour votre entreprise"
                                name="type"
                                value={formData.typeCredit}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            >
                                <MenuItem value="particulier">Credit 4</MenuItem>
                                <MenuItem value="entreprise">Credit 5</MenuItem>
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
                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Ad Title"
                            name="adTitle"
                            value={formData.adTitle}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                        <TextField
                            label="Ad Content"
                            name="adContent"
                            value={formData.adContent}
                            onChange={handleChange}
                            variant="outlined"
                            fullWidth
                        />
                    </Box>
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <div className='container'>
            <div className="card">
                <div className="card-body">
                    <Stepper nonLinear activeStep={activeStep}>
                        {steps.map((label, index) => (
                            <Step key={label} completed={completed[index]}>
                                <StepButton color="inherit" onClick={handleStep(index)}>
                                    {label}
                                </StepButton>
                            </Step>
                        ))}
                    </Stepper>
                    <div>
                        {allStepsCompleted() ? (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1 }}>
                                    All steps completed - you&apos;re finished
                                </Typography>
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleReset}>Reset</Button>
                                </Box>
                            </React.Fragment>
                        ) : (
                            <React.Fragment>
                                <Typography sx={{ mt: 2, mb: 1, py: 1 }}>
                                    Step {activeStep + 1}
                                </Typography>
                                <StepContent step={activeStep} />
                                <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                    <Button
                                        color="inherit"
                                        disabled={activeStep === 0}
                                        onClick={handleBack}
                                        sx={{ mr: 1 }}
                                    >
                                        Back
                                    </Button>
                                    <Box sx={{ flex: '1 1 auto' }} />
                                    <Button onClick={handleNext} sx={{ mr: 1 }}>
                                        Next
                                    </Button>
                                    {activeStep !== steps.length &&
                                        (completed[activeStep] ? (
                                            <Typography variant="caption" sx={{ display: 'inline-block' }}>
                                                Step {activeStep + 1} already completed
                                            </Typography>
                                        ) : (
                                            <Button onClick={handleComplete}>
                                                {completedSteps() === totalSteps() - 1
                                                    ? 'Finish'
                                                    : 'Complete Step'}
                                            </Button>
                                        ))}
                                </Box>
                            </React.Fragment>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

Home.layout = (page) => <Guest children={page} title={"Home"} />;
