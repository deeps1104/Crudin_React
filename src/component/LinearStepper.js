import React, { useState } from "react";
import {
  Typography,
  TextField,
  Button,
  Stepper,
  Step,
  StepLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import axios from 'axios'

import {
  useForm,
  Controller,
  FormProvider,
  useFormContext,
} from "react-hook-form";

const useStyles = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
}));

function getSteps() {
  return [
    "Basic information",
    "Contact Information",
    "Personal Information",
  ];
}

const BasicForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="first_name"
        render={({ field }) => (
          <TextField
            id="first_name"
            label="First Name"
            variant="outlined"
            placeholder="Enter Your First Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="middle_name"
        render={({ field }) => (
          <TextField
            id="middle_name"
            label="Middle Name"
            variant="outlined"
            placeholder="Enter Your Middle Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="last_name"
        render={({ field }) => (
          <TextField
            id="last_name"
            label="Last Name"
            variant="outlined"
            placeholder="Enter Your Last Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>
  );
};
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="email"
        render={({ field }) => (
          <TextField
            id="email"
            label="E-mail"
            variant="outlined"
            placeholder="Enter Your E-mail Address"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="phone_number"
        render={({ field }) => (
          <TextField
            id="phone_number"
            label="Phone Number"
            variant="outlined"
            placeholder="Enter Your Phone Number"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="address_line1"
        render={({ field }) => (
          <TextField
            id="address_line1"
            label="Address 1"
            variant="outlined"
            placeholder="Enter Your Address 1"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="address_line2"
        render={({ field }) => (
          <TextField
            id="address_line2"
            label="Address 2"
            variant="outlined"
            placeholder="Enter Your Address 2"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
    </>

  );
};
const PersonalForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Controller
        control={control}
        name="country"
        render={({ field }) => (
          <TextField
            id="country"
            label="Country"
            variant="outlined"
            placeholder="Enter Your Country Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

      <Controller
        control={control}
        name="state"
        render={({ field }) => (
          <TextField
            id="state"
            label="State"
            variant="outlined"
            placeholder="Enter Your State Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="city"
        render={({ field }) => (
          <TextField
            id="city"
            label="City"
            variant="outlined"
            placeholder="Enter Your City Name"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />
      <Controller
        control={control}
        name="pin_code"
        render={({ field }) => (
          <TextField
            id="pin_code"
            label="PinCode"
            variant="outlined"
            placeholder="Enter Your PinCode"
            fullWidth
            margin="normal"
            {...field}
          />
        )}
      />

    </>
  );
};
function getStepContent(step) {
  switch (step) {
    case 0:
      return <BasicForm />;
    case 1:
      return <ContactForm />;
    case 2:
      return <PersonalForm />;
    default:
      return "unknown step";
  }
}
const LinearStepper = (props) => {
  const classes = useStyles();
  const methods = useForm({
    defaultValues: {
      first_name: "",
      last_name: "",
      middle_name: "",
      email: "",
      phone_number: "",
      address_line1: "",
      address_line2: "",
      city: "",
      state: "",
      country: "",
      pin_code: ""

    },
  });
  const [activeStep, setActiveStep] = useState(0);
  const [skippedSteps, setSkippedSteps] = useState([]);
  const steps = getSteps();
  const isStepOptional = (step) => {
    return step === 1 || step === 2;
  };

  const isStepSkipped = (step) => {
    return skippedSteps.includes(step);
  };

 
  const handleNext = (data) => {
    console.log(data);
    if (activeStep == steps.length - 1) {
      axios.post("http://127.0.0.1:8000/app/profile/",data)
      .then((res)=>{
        console.log(res);
        setActiveStep(activeStep + 1);
        props.getapi();
        
      })
      window.location.reload();
    } 
    
    else {
      setActiveStep(activeStep + 1);
      setSkippedSteps(
        skippedSteps.filter((skipItem) => skipItem !== activeStep)
      );
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const handleSkip = () => {
    if (!isStepSkipped(activeStep)) {
      setSkippedSteps([...skippedSteps, activeStep]);
    }
    setActiveStep(activeStep + 1);
  };
  return (
    <div>
      <Stepper alternativeLabel activeStep={activeStep}>
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography
                component={'span'}
                variant="caption"
                align="center"
                style={{ display: "block" }}
              >
                optional
              </Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <Typography variant="h3" align="center">
          Thank You
        </Typography> 
      ) : (
        <>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleNext)}>
              {getStepContent(activeStep)}

              <Button
                className={classes.button}
                disabled={activeStep === 0}
                onClick={handleBack}>
                back
              </Button>
              {isStepOptional(activeStep) && (
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={handleSkip}
                >
                  skip
                </Button>
              )}
              <Button
                className={classes.button}
                variant="contained"
                color="primary"
                type="submit">
                {activeStep === steps.length - 1 ? "Finish" : "Next"}
              </Button>
            </form>
          </FormProvider>
        </>
      )}

    </div>

  );
};

export default LinearStepper;