import React, { Component } from "react";
import PropTypes from "prop-types";
import AppIcon from "../images/slydro-logo-big.png";
import { Link } from "react-router-dom";
// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
// Redux Stuff
import { connect } from 'react-redux';
import { resetPassword } from '../redux/actions/slyderActions';

const styles = {
    typography: {
      useNextVariants: true
    },
    form: {
      textAlign: "center !important"
    },
    image: {
      margin: "0 auto"
    },
   
    displayLinebreaks: {
      whiteSpace: "pre-wrap"
    },
    textField: {
      margin: "10px auto 10px auto",
      textAlign: "center",
      padding: "0 16px !important"
    },
    button: {
      margin: "20px auto",
      width: "200px",
      position: "relative"
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10px"
    },
    customMessage: {
      color: "#9efafa",
      fontSize: "0.8rem",
      marginTop: "10px"
    },
    progress: {
      position: "absolute"
    },
    link: {
          color: "#02fafa",
          "&:hover": {
              color: "#9efafa",
          },
      },
  }

class reset extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      loading: false,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    // Save input to slyderData variable
    const slyderData = {
        email: this.state.email
    };
    this.props.resetPassword(slyderData, this.props.history)
    
  };
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: { loading, errors, success } } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm={4}>
        <br/>
				<img
            src={AppIcon}
            alt="Slydro Logo"
            className={classes.image}
            width="100"
          />
          <Typography variant="h4" className="title">
          <span className="title">RESET PASSWORD</span>
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
          <TextField
              id="email"
              name="email"
              type="email"
              label="EMAIL ADDRESS"
              className={classes.textField}
              helperText={errors && errors.email ? errors.email : ""}
              error={errors && errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              autoComplete="email"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors && errors.reset && (
              <Typography variant="body2" className={classes.customError}>
                {errors.reset}
              </Typography>
            )}
            {success && success.message && (
              <Typography variant="body2" className={classes.customMessage}>
                {success.message}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              <strong>RESET PASSWORD</strong>
              {loading && (
                <CircularProgress size={30} className={classes.progress}/>
              )}
            </Button>
            <br />
            <small className="small-text">
              NEED AN ACCOUNT? SIGN UP <Link to="/signup" className={classes.link}>HERE</Link>
            </small>
          </form>
        </Grid>
        <Grid item sm />
      </Grid>
    );
  }
}
reset.propTypes = {
  classes: PropTypes.object.isRequired,
  resetPassword: PropTypes.func.isRequired,
  slyder: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};
// Bring elements in from Global State and maps them to the Component State
const mapStateToProps = (state) => ({
    slyder: state.slyder,
    UI: state.UI
});
const mapActionsToProps = {
    resetPassword
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(reset));