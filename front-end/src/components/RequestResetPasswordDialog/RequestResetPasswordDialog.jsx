import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { REQUEST_RESET_PASSWORD } from '../../graphql/mutations/requestResetPassword'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const RequestResetPasswordDialog = () => {
  const [open, setOpen] = React.useState(false);
  let email = '';

  const [requestResetPassword, { data }] = useMutation(REQUEST_RESET_PASSWORD)

  const handleClickOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    if (email) {
      requestResetPassword({ variables: { email } })
      handleClose()
    }
  }

  const changeTextValue = (event) => {
    email = event.target.value
  }


  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        Forgot Password?
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Reset password</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To request password reset to this website, please enter your email address here. We will send a email
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="email"
            onChange={e => {
              e.preventDefault()
              changeTextValue(e)
            }}
            label="Email Address"
            type="email"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Request
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default RequestResetPasswordDialog