import React, { Fragment } from "react";
import Button from "./Button";
import Card from "./Card";
import classes from "./ErrorModal.module.css";

const ErrorModal = (props) => {
  return (
    <Fragment>
      <div className={classes.backdrop} onClick={props.onConfirm}></div>
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>Loading...</h2>
        </header>
      </Card>
    </Fragment>
  );
};

export default ErrorModal;
