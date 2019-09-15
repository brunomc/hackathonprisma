import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup/index';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/Input';
import useForm from 'react-hook-form';
import { TextField, Select, MenuItem, OutlinedInput } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import { 
  DateTimePicker,
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker
} from "@material-ui/pickers";

import { getDefaultValues } from 'apollo-utilities';
import * as moment from 'moment';
// import { Container } from './styles';
function FieldGroup(props) {
    const { register, handleSubmit, errors, getValues } = useForm();
    const [state, setState] = useState({ youAre: '' });
    const [expertises, setExpertises] = useState([]);
    const [firstLoadValueMultiple, setFirstLoadValueMultiple] = useState([]);
    const [selectedDate, handleDateChange] = useState();
    const handleChange = data => event => {
        if (data.type === 'select-multiple') {
            setExpertises(event.target.value)
            data.setMultipleSelect(event.target.value)
            setFirstLoadValueMultiple(event.target.value)

        } else {

            data.setSelect(event.target.value)
        }
        setState({
            ...state,
            [data.name]: event.target.value,
        });
    };
    useEffect(() => {

        if (props.defaultValueMultiple && firstLoadValueMultiple.length === 0) {
            setFirstLoadValueMultiple(props.defaultValueMultiple)
            setExpertises(props.defaultValueMultiple)
        }
        if (props.defaultValueSelect) {
            setState({ youAre: props.defaultValueSelect })
        }
        if (props.defaultValueDateStart) {
           handleDateChange(props.defaultValueDateStart)
           props.setDate(props.defaultValueDateStart)
        }
        if (props.defaultValueDateEnd) {
           handleDateChange(props.defaultValueDateEnd)
           props.setDate(props.defaultValueDateEnd)
        }


    }, [props, expertises])
    
    return (

        <FormGroup>
            <FormControl>
                {props.type === 'select' ?
                    <React.Fragment>
                        <Select
                            onChange={handleChange(props)}
                            value={props.defaultValue ? setState({ youAre: props.defaultValue }) : state.youAre}
                            name={props.name}
                            input={<TextField
                                select
                                variant="outlined"
                                margin="normal"
                                required={props.required}
                                id={props.name}
                                label={props.label}
                                name={props.name}
                                autoFocus
                                type={props.type}
                                defaultValue={state.youAre}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            >
                                {props.options.map(option => {
                                    return (<MenuItem value={option}>{option}</MenuItem>);
                                })}


                            </TextField>}
                        >
                            {props.options.map(option => {
                                return (<MenuItem value={option}>{option}</MenuItem>);
                            })}

                        </Select>
                        {props.validateMessage !== "" && props.name == 'youAre' ? <span style={{ color: 'red' }}>{props.validateMessage}</span> : ""}
                    </React.Fragment>
                    :
                    props.type === 'select-multiple' ?
                        <React.Fragment>
                            <Select
                                multiple
                                onChange={handleChange(props)}
                                value={expertises}
                                name={props.name}
                                input={<TextField
                                    select
                                    variant="outlined"
                                    margin="normal"
                                    required={props.validation && props.validation.required ? true : false}
                                    id={props.name}
                                    label={props.label}
                                    name={props.name}
                                    autoFocus
                                    type={props.type}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    {props.options.map((option) => {
                                        return (<MenuItem value={option} key={option}>{option}</MenuItem>);
                                    })}


                                </TextField>}
                            >
                                {props.options.map(option => {
                                    return (<MenuItem value={option} key={option}>{option}</MenuItem>);
                                })}

                            </Select>
                            {props.validateMessage !== "" && props.name == 'expertise' ? <span style={{ color: 'red' }}>{props.validateMessage}</span> : ""}
                        </React.Fragment>
                        :
                        props.type === 'text-area' ?
                            <TextField
                            variant="outlined"
                            margin="normal"
                            multiline
                            rows={props.rows}
                            id={props.name}
                            label={props.label}
                            name={props.name}
                            autoFocus
                            type={props.type}
                            disabled={props.disabled}
                            inputRef={props.inputRef(props.validation)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                         :
                         props.type ==='date-time' ?
                         <React.Fragment>
                            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                 <DateTimePicker
                                 ampm={false}
                                 showTodayButton
                                 format="dd/MM/yyyy HH:mm"
                                    label={props.label}
                                    inputVariant="outlined"
                                    value={selectedDate}
                                    onChange={(e)=>{
                                        handleDateChange(e)
                                        props.setDate(moment(e).format("YYYY-MM-DDThh:mm:ss.sssZ"))
                                    }}
                                  />
                            </MuiPickersUtilsProvider>
                         </React.Fragment>
                         :
                          props.type ==='date' ?
                         <React.Fragment>
                            
                         </React.Fragment>
                         :
                        <TextField
                            variant="outlined"
                            margin="normal"
                            fullWidth
                            id={props.name}
                            label={props.label}
                            name={props.name}
                            autoFocus
                            type={props.type}
                            disabled={props.disabled}
                            inputRef={props.inputRef(props.validation)}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                }
                {props.error && Object.keys(props.error).length > 0 ?
                    props.error && props.error.repeatPassword ?
                        <span style={{ color: 'red' }}>{props.error[props.name] && 'This field is different from password'}</span>
                        :
                        <span style={{ color: 'red' }}>{props.error[props.name] && props.error[props.name].message}</span>
                    :
                    "" 
                }

            </FormControl>
        </FormGroup >
    );
}
const FormInputs = (props) => {
    var row = [];
    for (var i = 0; i < props.ncols.length; i++) {
        row.push(

            <Grid item xs={12} sm={Number(props.ncols[i])} lg={Number(props.ncols[i])} xl={Number(props.ncols[i])} key={props.properties[i].id} >
                <FieldGroup {...props.properties[i]} />
            </Grid>

        );

    }
    return (
        <Grid container spacing={3} >
            {row}
        </Grid>
    );

};

export default FormInputs;
