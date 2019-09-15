import React from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Layout from '../../components/Layout/Layout';
import { menus } from '../../config/menus';
import { colors } from '../../config/colors'
import ProfileContent from '../../components/ProfileContent';
import AuthComponent from '../../components/AuthComponent/AuthComponent'
const Profile = (props) => {
    return (
        <AuthComponent>
            <Layout
                withAppBar={true}
                menus={menus}
                withMenu
                paddinTopMenu="5vh"
                colors={colors}
                textTopMenu=""
                logo=""
                logoTxt="Mr Higgs"
                withLogout={true}
                logoStyle={{ width: '10%', height: '20%' }}
                content={<ProfileContent />
                }
            />
        </AuthComponent>
    );
}
const mapStateToProps = state => ({})
const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Profile)

