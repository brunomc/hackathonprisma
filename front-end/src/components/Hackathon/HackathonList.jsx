import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import HackathonCard from './HackathonCard'
import { getHackathons } from '../../graphql/queries/hackathons'
import { changeHackathon } from '../../duck/actions/hackathonAction'
import { setUser } from '../../duck/actions/userAction'

import { Grid, Container, CircularProgress, Box } from '@material-ui/core';

const HackathonList = (props) => {
    const { loading, error, data } = useQuery(getHackathons, { variables: { user: props.user.id } });
    useEffect(() => {
        if (data && data.hackathons) props.changeHackathon(data.hackathons)
        if (data && data.user) props.setUser(data.user)
    }, [data])
    if (loading) {
        return <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justify="center"
            style={{ minHeight: '100vh' }}><Grid item xs={3}><CircularProgress disableShrink /></Grid></Grid>
    }
    return (
        <div>
            <Box display="flex" justifyContent="center">
                <h1>Hackathons</h1>
            </Box>
            <Container>
                <Grid container spacing="5">
                    {props.hackathons.map(card => {
                        return (
                            <Grid item xs={12} sm={12} lg={3} xl={3} key={card.name}>
                                <HackathonCard data={card} />
                            </Grid>
                        );
                    })
                    }
                </Grid>
            </Container>


        </div>
    );
}

const mapStateToProps = state => ({
    hackathons: state.hackathon.hackathons,
    user: state.user.user
})
const mapDispatchToProps = dispatch => bindActionCreators({ changeHackathon, setUser }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(HackathonList)