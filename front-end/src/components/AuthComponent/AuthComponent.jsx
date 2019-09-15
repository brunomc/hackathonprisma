import React, { useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GetUserByToken } from '../../graphql/mutations/user'
import { bindActionCreators } from 'redux'
import { checkToken } from '../../duck/actions/authAction'
import { navigate } from 'hookrouter'
import { connect } from 'react-redux'
import LoadingOverlay from 'react-loading-overlay';
const AuthComponent = (props) => {
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
    if (props.checkedToken) return props.children
    return <LoadingOverlay active={true} spinner text='Loading...' ><div style={{width:'100vw',height:'100vh'}}></div></LoadingOverlay>
}
const mapStateToProps = state => ({
    checkedToken: state.auth.checkedToken
})
const mapDispatchToProps = dispatch => bindActionCreators({ checkToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(AuthComponent)

