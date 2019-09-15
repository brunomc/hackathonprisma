import React from 'react';
import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors';
import { navigate } from 'hookrouter';
import { useMutation } from '@apollo/react-hooks';
import { CHANGE_PASSWORD } from '../../graphql/mutations/changePassword'
import { Box, Button, TextField } from '@material-ui/core';

const ChangePassword = (props) => {
    let password = ''
    let token = props.token
    const [changePassword, { data }] = useMutation(CHANGE_PASSWORD)
    const changeTextValue = (e) => {
        password = e.target.value
    }
    const onSubmit = () => {
        if (password) {
            changePassword({ variables: { token, password } })
            navigate('/login')
        }
    };
    return (
        <div>
            <Box mt={15} cols={3} display="flex" justifyContent="center">
                <TextField
                    autoFocus
                    margin="password"
                    id="password"
                    onChange={e => {
                        e.preventDefault()
                        changeTextValue(e)
                    }}
                    label="new password"
                    type="password"
                />
            </Box>

            <Box mt={2} display="flex" justifyContent="center">
                <Button onClick={onSubmit} variant="contained">
                    change
                </Button>
            </Box>
        </div>
    )
}
const ChangePasswordView = (props) => {
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
        content={<ChangePassword {...props} />}

    />);
}

export default (ChangePasswordView)
