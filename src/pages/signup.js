import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

// Redux
import { connect } from "react-redux";
import { signupSlyder } from "../redux/actions/slyderActions";

// MUI Stuff
import withStyles from "@material-ui/core/styles/withStyles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
	typography: {
		useNextVariants: true,
	},
	form: {
		textAlign: "center",
	},
	image: {
		margin: "0 auto",
	},

	displayLinebreaks: {
		whiteSpace: "pre-wrap",
	},
	textField: {
		margin: "10px auto 10px auto",
		textAlign: "center",
		padding: "0 16px !important",
	},
	button: {
		margin: "20px auto",
		width: "200px",
		position: "relative",
	},
	customError: {
		color: "red",
		fontSize: "0.8rem",
		marginTop: "10px",
	},
	customMessage: {
		color: "#ff9800",
		fontSize: "1rem",
		marginTop: "10px",
	},
	progress: {
		position: "absolute",
	},
	link: {
		color: "#02fafa",
		"&:hover": {
			color: "#f5e2b3",
		},
	},
};

class signup extends Component {
	constructor() {
		super();
		this.state = {
			email: "",
			password: "",
			confirmPassword: "",
			firstName: "",
			lastName: "",
			loading: false,
			errors: {},
		};
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.UI.errors !== this.props.UI.errors && this.props.UI.errors) {
			this.setState({ errors: this.props.UI.errors });
		}
		if (prevState.errors !== this.state.errors) {
			this.setState({ errors: this.state.errors });
		}
	}

	handleSubmit = (event) => {
		event.preventDefault();
		this.setState({
			loading: true,
		});
		// Save input to newUserData variable
		const newSlyderData = {
			email: this.state.email,
			password: this.state.password,
			confirmPassword: this.state.confirmPassword,
			firstName: this.state.firstName,
			lastName: this.state.lastName,
		};
		this.props.signupSlyder(newSlyderData, this.props.history);
	};
	handleChange = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};
	render() {
		const {
			classes,
			UI: { loading },
		} = this.props;
		const { errors } = this.state;
		return (
			<Grid container className={classes.form}>
				<Grid item sm />
				<Grid item sm>
                <Typography variant="h4" className="title">
            <span className="title">SIGN UP</span>
          </Typography>
					<form noValidate onSubmit={this.handleSubmit}>
						<TextField
							id="email"
							name="email"
							type="email"
							label="EMAIL ADDRESS"
							className={classes.textField}
							helperText={errors.email}
							error={errors.email ? true : false}
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
							helperText={errors.password}
							error={errors.password ? true : false}
							value={this.state.password}
							onChange={this.handleChange}
							fullWidth
							autoComplete="new-password"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<TextField
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							label="CONFIRM PASSWORD"
							className={classes.textField}
							helperText={errors.confirmPassword}
							error={errors.confirmPassword ? true : false}
							value={this.state.confirmPassword}
							onChange={this.handleChange}
							fullWidth
							autoComplete="new-password"
							InputLabelProps={{
								shrink: true,
							}}
						/>
						<span>
							<TextField
								id="firstName"
								name="firstName"
								type="name"
								label="FIRST NAME"
								className={classes.textField}
								helperText={errors.firstName}
								error={errors.firstName ? true : false}
								value={this.state.firstName}
								onChange={this.handleChange}
								autoComplete="given-name"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<TextField
								id="lastName"
								name="lastName"
								type="name"
								label="LAST NAME"
								className={classes.textField}
								helperText={errors.lastName}
								error={errors.lastName ? true : false}
								value={this.state.lastName}
								onChange={this.handleChange}
								autoComplete="family-name"
								InputLabelProps={{
									shrink: true,
								}}
							/>
						</span>
						<br />
						{errors.general && (
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
							<strong className={classes.buttonText}>SIGN UP</strong>
							{loading && (
								<CircularProgress size={30} className={classes.progress} />
							)}
						</Button>
						<br />
						<div className="small-text">
							<small>
								HAVE AN ACCOUNT? LOG IN <Link to="/login" className={classes.link}>HERE</Link>
							</small>
						</div>
					</form>
				</Grid>
				<Grid item sm />
			</Grid>
		);
	}
}
signup.propTypes = {
	classes: PropTypes.object.isRequired,
	slyder: PropTypes.object.isRequired,
	UI: PropTypes.object.isRequired,
	signupSlyder: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	slyder: state.slyder,
	UI: state.UI,
});

export default connect(mapStateToProps, { signupSlyder })(
	withStyles(styles)(signup)
);
