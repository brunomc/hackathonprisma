import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors'
import useForm from 'react-hook-form';
import Input from '@material-ui/core/Input';
import FormInputs from '../../components/FormInputs/FormInputs';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { Title, Center, Form, Error } from './styles';
import { FormControlLabel, Checkbox, CircularProgress } from '@material-ui/core';
import { navigate } from 'hookrouter';
import { useMutation } from '@apollo/react-hooks';
import { authenticate } from '../../duck/actions/authAction'
import { CreateUser } from '../../graphql/mutations/user'
import Dropzone from '../../components/Dropzone/Dropzone';
import { toBase64 } from '../../utils/utils';
const RegisterContent = (props) => {
    const [image, setImage] = useState('');
    const [youAre, setYouAre] = useState('');
    const [expertises, setExpertises] = useState([]);
    const [isSamePassword, setIsSamePassword] = useState(false);
    const [validateYouAre, setValidateYouAre] = useState("");
    const [validateExpertises, setValidateExpertises] = useState("");
    const [loading, setLoading] = useState(false)
    const { register, handleSubmit, setValue, errors, getValues, setError } = useForm({
        mode: 'onSubmit'
    });
    const [createUser, { data }] = useMutation(CreateUser, {
        onCompleted: (resp) => {
            setLoading(false);
            if (resp.createUser.id) {
                alert('User registered')
                navigate('/')
            }
        },
        onError: (error) => {
            // setErrorAuth(error.graphQLErrors[0].message);
            // setLoading(false);
            // localStorage.setItem('token', "");
            // navigate('/login');
            console.log(error);

        }
    })
    const onSubmit = async data => {
        if (youAre === "" || expertises.length === 0) {
            if (expertises.length === 0) {
                setValidateExpertises("Please select this!")
            }
            if (youAre === "") {
                setValidateYouAre("Please select this!")
            }
            return
        }
        console.log('formData', { ...data, expertises: expertises, youAre: youAre, avatar: await toBase64(image) })
        const usr = { ...data, expertise: expertises, type: youAre }
        setLoading(true)
        createUser({ variables: { name: usr.name, email: usr.email, password: usr.password, expertise: usr.expertise, type: usr.type, avatar: await toBase64(image) } })
    }; // callback when validation pass
    return (
        <Container maxWidth="sm">
            <Title>Informações de Cadastro</Title>
            <Form onSubmit={handleSubmit(onSubmit)}>
                <Dropzone reg={register} image={setImage} />
                <FormInputs
                    ncols={['12', '12', '6', '6', '6']}
                    properties={[
                        {
                            id: "name",
                            name: 'name',
                            label: 'Nome',
                            inputRef: register,
                            validation: { },
                            error: errors
                        },
                        {
                            id: "surname",
                            name: 'surname',
                            label: 'Sobrenome',
                            inputRef: register,
                            validation: {},
                            error: errors
                        },
                        {
                            id: "cpf",
                            name: 'cpf',
                            label: 'CPF',
                            inputRef: register,
                            validation: {},
                            error: errors
                        },
                        {
                            id: "rg",
                            name: 'rg',
                            label: 'RG',
                            inputRef: register,
                            validation: {},
                            error: errors,
                        },
                        {
                            id: "numeroCarteiraDeTrabalho",
                            name: 'numeroCarteiraDeTrabalho',
                            label: 'Número da Carteira de Trabalho',
                            inputRef: register
                        }
                    ]}
                />
                <input type="hidden" name="youAre" />
                <input type="hidden" name="expertises" />
                <input type="hidden" name="avatar" ref={register} />
                <h5>Você já tem cadastro? <a href="/login" >Acessar</a></h5>
                <Button variant="contained" type='submit' >
                    {loading ? <CircularProgress disableShrink /> : "Register"}
                </Button>
            </Form>
        </Container>
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
        content={<RegisterContent {...props} />}

    />);
}

const mapStateToProps = state => ({
    token: state.auth.token
})
const mapDispatchToProps = dispatch => bindActionCreators({ authenticate }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Register)
