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
import CardSquad from '../../components/Squad/CardSquad';
import { Grid, CircularProgress, Container } from '@material-ui/core';
const SquadsContent = (props) => {
    const teste = [
        { name: 'Equipe 01', description: 'askasojasojasojasoj' },
        { name: 'Equipe 02', description: 'askasojasoj' },
        { name: 'Equipe 01', de3cription: 'askasojasojasojasoj' },
        { name: 'Equipe 04', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' },
        { name: 'Hackathon Shift', description: 'askasojasojasojasoj' }
    ]
    return (
        <div>
            <h1>Squads</h1>
            <Grid container spacing="3">
                {teste.map(card => {
                    return (

                        <Grid item xs="12" sm="12" lg="4" xl="4" key={card.name}>
                            <CardSquad data={card} />
                        </Grid>

                    );

                })
                }


            </Grid>

        </div>
    );
}
const Squads = (props) => {
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
            content={<SquadsContent {...props} />
            }
        />
    return <Container><CircularProgress disableShrink /></Container>


}
const mapStateToProps = state => ({
    checkedToken: state.auth.checkedToken
})
const mapDispatchToProps = dispatch => bindActionCreators({ checkToken }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Squads)

