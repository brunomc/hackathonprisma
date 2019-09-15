import React, { useState, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setHackathon } from '../../../duck/actions/hackathonAction'
import useForm from 'react-hook-form';
import { Button } from '@material-ui/core';
import FormInputs from '../../FormInputs/FormInputs';
import LoadingOverlay from 'react-loading-overlay';
import { SnackbarContentWrapper } from '../../Snackbar';
import Snackbar from '@material-ui/core/Snackbar';
import { UPDATE_HACKATHON } from '../../../graphql/mutations/hackathon'
import { GET_HACKATHON_BY_ID } from '../../../graphql/queries/hackathons'
import * as moment from 'moment';

const HackathonEdit = (props) => {
    const { data } = useQuery(GET_HACKATHON_BY_ID, { variables: { id: props.hackathon.id } })
    const [isLoading, setIsLoading] = useState(true);
    const [openSnackBar, setOpenSnackBar] = useState({ open: false, type: "info", message: "" });
    const [startDate, setStartDate] = useState(new Date());
    const [validateStart, setValidateStart] = useState("");
    const [validateEnd, setValidateEnd] = useState("");
    const [endDate, setEndDate] = useState(moment());
    const { register, handleSubmit, setValue, errors, getValues } = useForm({ mode: 'onSubmit' });
    const [updateHackathon] = useMutation(UPDATE_HACKATHON, {
        onCompleted: (resp) => {
            props.setHackathon({ ...resp.updateHackathon, id: props.hackathon.id, name: props.hackathon.name });
            setIsLoading(false);
            setOpenSnackBar({ open: true, type: 'success', message: "hackathon updated with success!" })
        },
        onError: (error) => {
            setIsLoading(false);
            setOpenSnackBar({ open: true, type: 'error', message: "Error on update hackathon!" })
        }
    });
    useEffect(() => {
        console.log('hack', data)
        if (data && data.hackathon) {
            setValue('name', data.hackathon.name)
            setValue('description', data.hackathon.description)
            setStartDate(data.hackathon.start)
            setEndDate(data.hackathon.end)
            setValue('start', data.hackathon.start)
            setValue('end', data.hackathon.end)
            setIsLoading(false);            
        }
        setIsLoading(false);
    }, [data])
    const mountHackatonToUpdate = (submited) => {
        let hackathonToUpdate = {}
        for(let i in submited) {
           //if(submited[i] !== data.hackathon[i] ){
                hackathonToUpdate[i] = submited[i]
          // } 
        }
        hackathonToUpdate['id'] = props.hackathon.id;
        return hackathonToUpdate
    }
    const onSubmit = async data => {
        if(startDate === null){
            setValidateStart("Please insert a valid date!")
        }
         if(endDate === null){
            setValidateStart("Please insert a valid date!")
        }
        updateHackathon({ variables: mountHackatonToUpdate({...data,start:startDate,end:endDate}) })
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackBar({ open: false, type: 'info', message: "" });
    }
    return (
        <LoadingOverlay
            active={isLoading}
            spinner
            text='Loading...'
        >
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={openSnackBar.open}
                autoHideDuration={3000}
                onClose={handleClose}
            >
                <SnackbarContentWrapper
                    onClose={handleClose}
                    variant={openSnackBar.type}
                    message={openSnackBar.message}
                />
            </Snackbar>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <img style={{ width: '100%', height: '200px', border: '2px dashed #c6c6c6' }} src={`https://source.unsplash.com/800x200/?programmer`} />
                    <FormInputs
                        ncols={['7','10','5','5']}
                        properties={[
                            {
                                id: "name",
                                name: 'name',
                                label: 'Name',
                                inputRef: register,
                                validation: {
                                    required: 'Required name'
                                 },
                                error: errors
                            },
                            {
                                id: "description",
                                name: 'description',
                                label: 'Description',
                                inputRef: register,
                                type:'text-area',
                                rows: 6,
                                validation: {},
                                error: errors
                            },
                            {
                                id: "start",
                                name: 'start',
                                label: 'Start Event',
                                inputRef: register,
                                type:'date-time',
                                setDate: setStartDate,
                                validateMessage: validateStart ,
                                error: errors,
                                defaultValueDateStart: startDate
                            },
                            {
                                id: "end",
                                name: 'end',
                                label: 'End Event',
                                inputRef: register,
                                type:'date-time',
                                setDate: setEndDate,
                                validateMessage: validateEnd ,
                                error: errors,
                                defaultValueDateEnd: endDate
                            }
                        ]}
                    />
                    <br/>
                    <Button variant="outlined" type='submit' >save</Button>
                </form>
            </div >
        </LoadingOverlay>
    );
}

const mapStateToProps = state => ({
    hackathon: state.hackathon.hackathon,
    user: state.user.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ setHackathon }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HackathonEdit)

