import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import SlydroButton from '../util/SlydroButton';

// Components

// MUI Components
import { AppBar, Toolbar } from '@material-ui/core';

// Icons
import LoginIcon from '../icons/LoginIcon';
import SignupIcon from '../icons/SignupIcon';
import ResetIcon from '../icons/ResetIcon';
import HomeIcon from '../icons/HomeIcon';

const styles = {

};

class Navbar extends Component {

render(){
    const { authenticated, classes } = this.props;
    return(
        <AppBar>
            <hr className="bar-separator"/>
            <Toolbar className="nav-container">
            { authenticated  ? (
                <Fragment>
                    <Link to="/">
                        <SlydroButton tip="HOME">
                            <HomeIcon/>
                        </SlydroButton>
                    </Link>
                </Fragment>
            ) : (
                <Fragment>
                    <Link to="/login">
									<SlydroButton tip="LOGIN">
										<LoginIcon />
									</SlydroButton>
								</Link>
                                <Link to="/signup">
									<SlydroButton tip="SIGN UP">
										<SignupIcon />
									</SlydroButton>
								</Link>
                                <Link to="/reset">
									<SlydroButton tip="RESET PASSWORD">
										<ResetIcon />
									</SlydroButton>
								</Link>
                </Fragment>
            )}
            </Toolbar>
            
        </AppBar>
    )
}
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
     classes: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    authenticated: state.slyder.authenticated
});

export default connect(mapStateToProps)(withStyles(styles)(Navbar));