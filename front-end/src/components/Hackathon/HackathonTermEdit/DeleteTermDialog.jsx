import React from 'react';
import { useMutation } from '@apollo/react-hooks';
//import { DELETE_TERM } from '../../graphql/mutations/term'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const DeleteTermDialog = (props) => {
  const [open, setOpen] = React.useState(false);
 
  //const [deleteTerm, { data }] = useMutation(DELETE_TERM)

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
   
      //requestResetPassword({ variables: { email } })
      handleClose()
    
  }
  props.setDeleteTerm(setOpen);
  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Forgot Password?
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Delete Term</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Do you really want to delete?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeleteTermDialog