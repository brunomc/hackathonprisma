import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { checkToken } from '../../../duck/actions/authAction'
import { connect } from 'react-redux'
import Layout from '../../../components/Layout/Layout';
import AuthComponent from '../../../components/AuthComponent/AuthComponent'
import { menus } from '../../../config/menus';
import { colors } from '../../../config/colors';
import HackathonTabs from '../../../components/Hackathon/HackathonTabs/HackathonTabs';

const HackathonDetails = (props) => {
    return (
        <AuthComponent>
            <Layout
                withAppBar={true}
                menus={menus}
                withMenu
                paddinTopMenu="5vh"
                colors={colors}
                textTopMenu=""
                logo="https://www.trzcacak.rs/myfile/full/316-3169204_angry-panda-logo.png"
                logoTxt="Panda"
                logoStyle={{ width: '10%', height: '20%' }}
                content={<HackathonTabs {...props}/> }
            />
        </AuthComponent>
    );
}
const mapStateToProps = state => ({
    checkedToken: state.auth.checkedToken
})
const mapDispatchToProps = dispatch => bindActionCreators({ checkToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HackathonDetails)
