  
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Redux
import { connect } from 'react-redux';
import { loginSlyder } from '../redux/actions/slyderActions';

const styles = {
  typography: {
    useNextVariants: true
  },
  form: {
    textAlign: "center"
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
    color: "#ff9800",
    fontSize: "1rem",
    marginTop: "10px"
  },
  progress: {
    position: "absolute"
  },
  link: {
		color: "#02fafa",
		"&:hover": {
			color: "#f5e2b3",
		},
	},
}
class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      loading: false,
    };
  }

  handleSubmit = event => {
    event.preventDefault();
    // Save input to userData variable
    const slyderData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginSlyder(slyderData, this.props.history)
  }
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const { classes, UI: { loading, errors }} = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm={6}>
          <Typography variant="h4" className="title">
            <span className="title">LOGIN</span>
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
            <TextField
              id="password"
              name="password"
              type="password"
              label="PASSWORD"
              className={classes.textField}
              helperText={errors && errors.password ? errors.password : ""}
              error={errors && errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              autoComplete="current-password"
              InputLabelProps={{
                shrink: true,
              }}
            />
            {errors && errors.general && (
              <Typography variant="body2" className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              <strong>LOGIN</strong>
              {loading && (
                <CircularProgress size={30} className={classes.progress} />
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

login.propTypes = {
  classes: PropTypes.object.isRequired,
  loginSlyder: PropTypes.func.isRequired,
  slyder: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
  };
  
  // Bring elements in from Global State and maps them to the Component State
const mapStateToProps = (state) => ({
  slyder: state.slyder,
  UI: state.UI
});
const mapActionsToProps = {
  loginSlyder
  }
  
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(login));