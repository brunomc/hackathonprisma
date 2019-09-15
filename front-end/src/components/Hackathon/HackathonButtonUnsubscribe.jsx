import React, { useEffect } from 'react';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { changeHackathon } from '../../duck/actions/hackathonAction'
import { useMutation } from '@apollo/react-hooks';
import { UNSUBSCRIBE_HACKATHON } from '../../graphql/mutations/hackathon'
import { Button } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const HackathonButtonUnsubscribe = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    }
    const [unsubscribeHackathon] = useMutation(UNSUBSCRIBE_HACKATHON, {
        variables: { hackathonId: props.hackathon.id, participantId: props.user.id },
        onCompleted(data) {
            props.changeHackathon(data.updateHackathon)
        },
        onError(error) {
            console.log(error)
        }
    })
    const handleOpen = () => {
        setOpen(true);
    }
    const accept = () => {
        setOpen(false)
        unsubscribeHackathon()
    }
    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-terms"
                aria-describedby="alert-dialog-terms-description"
            >
                <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-terms-description">
                        SOME TEXT
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
            <Button variant="outlined" color="secondary" onClick={e => {
                e.preventDefault();
                handleOpen()
            }}>Unsubscribe</Button>
        </div>
    )
}


const mapDispatchToProps = dispatch => bindActionCreators({ changeHackathon }, dispatch)
export default connect(undefined, mapDispatchToProps)(HackathonButtonUnsubscribe)

