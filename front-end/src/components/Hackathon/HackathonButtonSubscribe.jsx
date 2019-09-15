import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser, subscribeUserHackathon } from '../../duck/actions/userAction'
import { useMutation } from '@apollo/react-hooks';
import { SUBSCRIBE_HACKATHON } from '../../graphql/mutations/hackathon'
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const HackathonButtonSubscribe = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const [subscribeHackathon] = useMutation(SUBSCRIBE_HACKATHON, {
        variables: { hackathonId: props.hackathon.id, participantId: props.user.id },
        onCompleted(data) {
            props.subscribeUserHackathon(data.updateHackathon.id)
        },
        onError(error) {
            console.log(error)
        }
    })
    const handleOpen = () => {
        if (props.hackathon.terms.length > 0) setOpen(true);
        else subscribeHackathon()
    }
    const accept = () => {
        setOpen(false)
        subscribeHackathon()
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-terms"
                aria-describedby="alert-dialog-terms-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you accept hackathon terms and conditions?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-terms-description">
                        <div className={classes.root}>
                            {props.hackathon.terms.map(term => {
                                return (
                                    <ExpansionPanel>
                                        <ExpansionPanelSummary
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id={term.id}
                                        >
                                            <Typography className={classes.heading}>{term.name}</Typography>
                                        </ExpansionPanelSummary>
                                        <ExpansionPanelDetails>
                                            <Typography>
                                                {term.content}
                                            </Typography>
                                        </ExpansionPanelDetails>
                                    </ExpansionPanel>
                                )
                            })}
                        </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Disagree
                </Button>
                    <Button onClick={accept} color="primary" autoFocus>
                        Agree
                </Button>
                </DialogActions>
            </Dialog>
            <Button variant="outlined" color="primary" onClick={e => {
                e.preventDefault();
                handleOpen()
            }}>Subscribe</Button>
        </div>
    )
}


const mapDispatchToProps = dispatch => bindActionCreators({ subscribeUserHackathon, setUser }, dispatch)
export default connect(undefined, mapDispatchToProps)(HackathonButtonSubscribe)

