import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors'
import useForm from 'react-hook-form';
import Input from '@material-ui/core/Input';
import FormInputs from '../../components/FormInputs/FormInputs';
import CheckboxList from '../../components/CheckboxList';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Title, Center, Form } from './styles';
import { FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import { navigate } from 'hookrouter';
import { useMutation } from '@apollo/react-hooks';
import { authenticate } from '../../duck/actions/authAction'
import { CreateUser } from '../../graphql/mutations/user'
import Dropzone from '../../components/Dropzone/Dropzone';
import { toBase64 } from '../../utils/utils';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import {Stepper, Paper} from '@material-ui/core';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '90%',
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const Content = (props) => {
    const classes = useStyles();
    const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [initialOptions, setInitialOptions] = useState([]);
  const getSteps = () => {
  return ['O que é verba recisória?', 'Você quer conferir quais verbas?', 'Estimativa de valor', 'Tem interesse em entrar com um processo judicial?'];
}
  const steps = getSteps();

  const  isStepOptional = (step) => {
    return step === 1;
  }
  

const getStepContent = (step) => {
  switch (step) {
    case 0:
      return <React.Fragment>
      <p>O que são verbas recisórias</p>
      </React.Fragment>
    case 1:
      return <React.Fragment>
      <p>{JSON.stringify(initialOptions)}</p>
         <CheckboxList setInitialOptions={setInitialOptions} />
      </React.Fragment>
    case 2:
      return 'This is the bit I really care about!';
      case 3:
      return 'Sim';
    default:
      return 'Unknown step';
  }
}
  const isStepSkipped = (step) => {
    return skipped.has(step);
  }

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(newSkipped);
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1);
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  }

  const handleReset = () => {
    setActiveStep(0);
  }

  return (
    <div className={classes.root}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = <Typography variant="caption">Optional</Typography>;
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <div>
        {activeStep === steps.length ? (
          <div>
             {navigate('/register')}
            <Button onClick={handleReset} className={classes.button}>
              Reset
            </Button>
          </div>
        ) : (
          <div>
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            <div>
              <Button disabled={activeStep === 0} onClick={handleBack} className={classes.button}>
                Voltar
              </Button>

              <Button
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                {activeStep === steps.length - 1 ? 'Sim' : 'Avançar'}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
const Register = (props) => {
    return (<Layout
        backgroundColor=""
        withAppBar={false}
        menus={menus}
        withMenu={false}
        paddinTopMenu="5vh"
        colors={colors}
        textTopMenu="Register"
        logo="https://www.trzcacak.rs/myfile/full/316-3169204_angry-panda-logo.png"
        logoTxt="Panda"
        logoStyle={{ width: '10%', height: '20%' }}
        withLogout={false}
        content={<Content {...props} />}

    />);
}

const mapStateToProps = state => ({
    token: state.auth.token
})
const mapDispatchToProps = dispatch => bindActionCreators({ authenticate }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Register)
