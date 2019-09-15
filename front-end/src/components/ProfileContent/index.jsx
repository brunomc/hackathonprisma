import React, { useState, useEffect } from 'react';
import { useMutation, useQuery} from '@apollo/react-hooks';
import { GetUserById } from '../../graphql/queries/user'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import useForm from 'react-hook-form';
import { TextField, Button, CircularProgress, Container } from '@material-ui/core';
import { Avatar, StyledDropZone } from './styles';
import FormInputs from '../../components/FormInputs/FormInputs';
import Dropzone from '../../components/Dropzone/Dropzone';
import { toBase64 } from '../../utils/utils';
import { setUser } from '../../duck/actions/userAction'
import { UpdateUser } from '../../graphql/mutations/user'
import LoadingOverlay from 'react-loading-overlay';
import {SnackbarContentWrapper} from '../../components/Snackbar';
import Snackbar from '@material-ui/core/Snackbar';

const ProfileContent = (props) => {
    const [image, setImage] = useState('');
    const [expertises, setExpertises] = useState([]);
    const [validateExpertises, setValidateExpertises] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [openSnackBar, setOpenSnackBar] = useState({open:false,type:"info",message:""});
    const { register, handleSubmit, setValue, errors, getValues } = useForm({mode: 'onSubmit'});
    const [updateUser] = useMutation(UpdateUser, {
        onCompleted: (resp) => {
            props.setUser({ ...resp.updateUser, id: props.user.id, email: props.user.email });
            setIsLoading(false);
            setOpenSnackBar({open:true, type:'success',message:"The profile updated with success!"})
        },
        onError: (error) => {
            setIsLoading(false);
            setOpenSnackBar({open:true, type:'error',message:"Error on update profile!"})
        }
    });
    const mountObjectToSubmit = () => {
        let userToUpdate = {}
        for (var field in getValues()) {
            if (field == "password" && getValues()[field] !== getValues()['repeatPassword']) {
                setValue(field, '')
                setValue('repeatPassword', '')
            }
            if (getValues()[field] !== "" && getValues()[field] !== undefined) {

                userToUpdate[field] = getValues()[field];
            }
        }
        if (expertises !== "" && expertises !== undefined) {
            userToUpdate['expertise'] = expertises;
        }
        if (props.user.id) {
            userToUpdate['id'] = props.user.id;
        }
        setIsLoading(true);
        delete userToUpdate.email
        return userToUpdate
    }
    const onSubmit = async data => {
        console.log({ ...data, avatar: image ? await toBase64(image) : "" })
        updateUser({ variables:  mountObjectToSubmit() })
    };
    const getUser = useQuery(GetUserById,{ variables:{ id: props.user.id }});
    useEffect(() => {
        if(getUser && getUser.data && getUser.data.user){
            setValue('name', getUser.data.user.name)
            setValue('email', getUser.data.user.email)
            setExpertises(getUser.data.user.expertise)
            setValue('expertise', expertises)
        } else {
            setValue('name', 'Loading...')
            setValue('email', 'Loading...')
            setValue('expertise', [])
        }
       setIsLoading(false);
    }, [getUser])
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenSnackBar({open:false, type:'info',message:""});
      }
    // input to dropzone save <input type="hidden" name="avatar" ref={register} />
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
                <h1>Profile</h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Dropzone reg={register} image={setImage} />
                    <input type="hidden" name="avatar" ref={register} />
                    <img style={{ width: '150px', height: '150px' }} src={`https://api.adorable.io/avatars/285/${props.user.id}@adorable.io.png`} />
                    <FormInputs
                        ncols={['6', '4', '4', '4', '4']}
                        properties={[
                            {
                                id: "name",
                                name: 'name',
                                label: 'Name',
                                inputRef: register,
                                validation: {},
                                error: errors
                            },
                            {
                                id: "email",
                                name: 'email',
                                label: 'Email',
                                inputRef: register,
                                validation: {},
                                error: errors,
                                disabled: true
                            },
                            {
                                id: "password",
                                name: 'password',
                                label: 'Password',
                                inputRef: register,
                                validation: {},
                                error: errors,
                                type: "password"
                            },
                            {
                                id: "repeatPassword",
                                name: 'repeatPassword',
                                label: 'Repeat Password',
                                inputRef: register,
                                validation: {},
                                error: errors,
                                type: "password"
                            },
                            {
                                id: "expertise",
                                name: 'expertise',
                                label: 'Your Expertise?',
                                inputRef: register,
                                required: true,
                                type: "select-multiple",
                                validateMessage: validateExpertises,
                                options: ['IT', 'DESIGN', 'BUSINESS', 'OTHERS'],
                                setMultipleSelect: setExpertises,
                                defaultValueMultiple: expertises



                            }
                        ]}
                    />
                    <input type="hidden" name="expertise" ref={register} />
                    <Button variant="contained" type='submit' >save</Button>
                </form>
            </div >
        </LoadingOverlay>
    );
}

const mapStateToProps = state => ({
    user: state.user.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ setUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ProfileContent)

