import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { Box } from '@material-ui/core';
import Hidden from '../hidden'
import HackathonButtonSubscribe from './HackathonButtonSubscribe'
import HackathonButtonUnsubscribe from './HackathonButtonUnsubscribe'


const useStyles = makeStyles(theme => ({
    root: {
        padding: theme.spacing(3, 2),
    },
}));

const HackathonInfo = (props) => {
    const classes = useStyles();
    let isSubscribe = props.hackathon.participants.filter(participant => participant.id === props.user.id).length > 0
    useEffect(() => {
        isSubscribe = props.hackathon.participants.filter(participant => participant.id === props.user.id).length > 0
    }, [props.hackathon])
    return (
        <div>
            <Paper className={classes.root}>
                <Typography variant="h5" component="h3">
                    {props.hackathon.name}
                </Typography>
                <Box m={5}>
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8N8XJovpunyzfzzKGpx1298XWO2TNUpyNcL98HfEJsEM2OG-1"
                        title="Contemplative Reptile"
                    />
                </Box>
                <Typography component="p">
                    {props.hackathon.description}
                </Typography>
                <Box mt={3}>
                    <Typography component="p">
                        {props.hackathon.participants.length} participants in {props.hackathon.squads.length} squads
                    </Typography>
                </Box>
                <Box mt={3}>
                    <Hidden hidden={isSubscribe}>
                        <HackathonButtonSubscribe {...props} />
                    </Hidden>
                    <Hidden hidden={!isSubscribe}>
                        <HackathonButtonUnsubscribe {...props} />
                    </Hidden>
                </Box >
            </Paper>
        </div>
    );
}

export default HackathonInfo