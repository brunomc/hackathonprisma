import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GetUserByToken } from '../../graphql/mutations/user'
import { bindActionCreators } from 'redux'
import { checkToken } from '../../duck/actions/authAction'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'
import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors'
import { CircularProgress, Container } from '@material-ui/core';
const AwardsContent = (props) => {
    return (
        <div><h1>Awards</h1></div>
    );
}
const Awards = (props) => {
    const [checkToken, { data }] = useMutation(GetUserByToken, {
        onCompleted: (resp) => props.checkToken(resp.getUserByToken),
        onError: (error) => { localStorage.setItem('token', ""); }
    })
    useEffect(() => {
        if (localStorage.getItem('token') !== "" && localStorage.getItem('token') !== null) {
            checkToken({ variables: { token: localStorage.getItem('token').split(' ')[1] } });
        } else {
            navigate('/login')
        }
    }, [props.checkedToken])
    if (props.checkedToken)
        return <Layout
            withAppBar={true}
            menus={menus}
            withMenu
            paddinTopMenu="5vh"
            colors={colors}
            textTopMenu=""
            logo="https://www.trzcacak.rs/myfile/full/316-3169204_angry-panda-logo.png"
            logoTxt="Panda"
            logoStyle={{ width: '10%', height: '20%' }}
            content={<AwardsContent {...props} />
            }
        />
    return <Container><CircularProgress disableShrink /></Container>
}
const mapStateToProps = state => ({
    checkedToken: state.auth.checkedToken
})
const mapDispatchToProps = dispatch => bindActionCreators({ checkToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Awards)

