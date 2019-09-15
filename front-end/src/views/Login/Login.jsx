import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors'
import useForm from 'react-hook-form';
import FormInputs from '../../components/FormInputs/FormInputs';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Title, Form, Error } from './styles';
import { CircularProgress, Box } from '@material-ui/core';
import { navigate } from 'hookrouter';
import { Authentication } from '../../graphql/mutations/authentication'
import { GetUserByToken } from '../../graphql/mutations/user'
import { useMutation } from '@apollo/react-hooks';
import { authenticate } from '../../duck/actions/authAction'
import { setUser } from '../../duck/actions/userAction'
import RequestResetPasswordDialog from '../../components/RequestResetPasswordDialog/RequestResetPasswordDialog';


const LoginContent = (props) => {
    const [errorAuth, setErrorAuth] = useState('')
    const [loading, setLoading] = useState(false)
    const [getUserByToken, { user }] = useMutation(GetUserByToken, {
        onCompleted: (resp) => {
            props.setUser(resp.getUserByToken);
        },
        onError: (error) => {
            console.log('error', error)
        }
    });
    const [authentication, { data }] = useMutation(Authentication, {
        onCompleted: (resp) => props.authenticate(resp),
        onError: (error) => {
            if (error.graphQLErrors) {
                setErrorAuth(error.graphQLErrors[0].message);
            } else {
                setErrorAuth('Sorry! Your credentials have one problem, please contact suport')
            }
            setLoading(false);
            localStorage.setItem('token', "");
            navigate('/login');
        }
    })
    const { register, handleSubmit, errors } = useForm(); // initialise the hook
    const onSubmit = formData => {
        setLoading(true)
        authentication({ variables: { email: formData.email, password: formData.password } })
    };
    useEffect(() => {
        if (localStorage.getItem('token') !== "" && localStorage.getItem('token') !== null) {
            getUserByToken({
                variables: {
                    token: localStorage.getItem('token').split(' ')[1]
                }
            })
            setLoading(false)
            navigate('/hackathons')
        }
    }, [props.token]);
    return (
        <Container maxWidth="sm">
            <Title>Login</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <FormInputs
                    ncols={['12', '12']}
                    properties={[
                        {
                            id: "email",
                            name: 'email',
                            label: 'Email',
                            inputRef: register,
                            validation: {
                                required: 'Required email',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                    message: "Invalid email address"
                                }
                            },
                            error: errors
                        },
                        {
                            id: "password",
                            name: 'password',
                            label: 'Password',
                            inputRef: register,
                            validation: {
                                required: 'Required password'
                            },
                            error: errors,
                            type: "password"
                        }

                    ]}
                />
                {errorAuth !== "" ? <Error>{errorAuth}</Error> : <React.Fragment />}
                <h5>Not on Hackathon  yet? <a href="/register" >Register</a></h5>
                <Box mb={3} >
                    <RequestResetPasswordDialog {...props}/>
                </Box>
                <Button variant="contained" type='submit' >
                    {loading ? <CircularProgress disableShrink /> : "Login"}
                </Button>
            </Form>

        </Container>
    );
}
const Login = (props) => {
    return (<Layout
        backgroundColor="#66B9BF"
        withAppBar={true}
        menus={menus}
        withMenu={false}
        paddinTopMenu="5vh"
        colors={colors}
        textTopMenu=""
        logo="https://www.trzcacak.rs/myfile/full/316-3169204_angry-panda-logo.png"
        logoTxt="Panda"
        logoStyle={{ width: '10%', height: '20%' }}
        withLogout={false}
        content={<LoginContent {...props} />}

    />);
}

const mapStateToProps = state => ({
    token: state.auth.token
})
const mapDispatchToProps = dispatch => bindActionCreators({ authenticate, setUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Login)
