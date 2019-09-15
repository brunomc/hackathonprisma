import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { navigate } from 'hookrouter'
import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors';
import { useMutation } from '@apollo/react-hooks';
import { GetUserByToken } from '../../graphql/mutations/user';
import { checkToken } from '../../duck/actions/authAction';
import { CircularProgress, Container } from '@material-ui/core';
import { setUser } from '../../duck/actions/userAction';
import HomeContent from '../../components/HomeContent';
import LoadingOverlay from 'react-loading-overlay';
import AuthComponent from '../../components/AuthComponent/AuthComponent'
const Home = (props) => {
   return (
            <Layout
                withAppBar={true}
                menus={menus}
                withMenu={false}
                paddinTopMenu="4vh"
                colors={colors}
                textTopMenu={props.user.name}
                logo="https://www.pinclipart.com/picdir/middle/1-11384_lawyer-clipart-law-firm-justia-png-transparent-png.png"
                logoTxt="Panda"
                withLogout={true}
                logoStyle={{ width: '5%', height: '10%' }}
                content={<HomeContent />}
            />
   );    
}
const mapStateToProps = state => ({
    checkedToken: state.auth.checkedToken,
    user: state.user.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ checkToken, setUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Home)

