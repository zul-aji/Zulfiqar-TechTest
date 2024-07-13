import React from "react";
import "./style/form.css";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  dialog:{
    position: "fixed",
    borderRadius: "10px",
    backdropFilter: "blur(3px)",
    backgroundColor:'rgba(0,0,30,0.4)',
  },
  dialogTitleSuccess: {
    borderRadius: "6px",
    backgroundColor: '#2CB67D',
    color: '#fff',
  },
  dialogTitleError: {
    borderRadius: "6px",
    backgroundColor: '#CE0E2D',
    color: '#fff',
  },
  dialogContentText: {
    borderRadius: "10px",
    padding: "20px 10px 0px 10px",
    color: "#000000 !important",
  },
  dialogActions: {
    borderRadius: "10px",
    padding: "10px",
    color: "#000000",
  },
  buttonSuccess: {
    color: "#000000",
    border: "0px",
    padding: "10px",
    margin: "0px 10px 3px 0px",
    "&:hover": {
      backgroundColor: "#2CB67D",
      borderRadius: "8px",
      color: "#fff",
    },
  },
  buttonFailed: {
    color: "#000000",
    border: "0px",
    padding: "10px",
    margin: "0px 10px 3px 0px",
    "&:hover": {
      backgroundColor: "#CE0E2D;",
      borderRadius: "8px",
      color: "#fff",
    },
  },
});

const AlertModal = ({ open, onClose, message, alertMessage, onExit, id }) => {
  const classes = useStyles();

  if (message==true){
    return (
      <Dialog 
      open={open}
      onClose={onClose}
      onExited={onExit}
      className={classes.dialog}
      BackdropProps={{ invisible: true }} >
        <DialogTitle name='successDialog' className={classes.dialogTitleSuccess} >
          Success
        </DialogTitle>
        <DialogContent>
          <DialogContentText name='message' className={classes.dialogContentText}>
            {id ? 'User updated' : 'User registered'}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <button
              className={classes.buttonSuccess}
              onClick={onClose}>
              close
            </button>
        </DialogActions>
      </Dialog>
    );
  } else {
    return (
      <Dialog 
      open={open} 
      onClose={onClose} 
      className={classes.dialog}
      BackdropProps={{ invisible: true }} >
        <DialogTitle name='failedDialog' className={classes.dialogTitleError}>
          Failed
        </DialogTitle>
        <DialogContent>
          <DialogContentText name='message' className={classes.dialogContentText}>
            {alertMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions className={classes.dialogActions}>
          <button
            className={classes.buttonFailed}
            onClick={onClose}>
            close
          </button>
        </DialogActions>
      </Dialog>
    );
  }
};

export default AlertModal;