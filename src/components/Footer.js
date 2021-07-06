import React, { Fragment, Component } from 'react';
import { connect } from 'react-redux';
import LogoutIcon from '../icons/LogoutIcon';
import SlydroButton from '../util/SlydroButton';
import { logoutSlyder } from '../redux/actions/slyderActions';

class Footer extends Component {

    handleLogout = () => {
        this.props.logoutSlyder();
    }

    render() {

        const { authenticated } = this.props;

        let footerMarkup = authenticated ? (
            
                <div>
                <div className="footer-icons">
                    <SlydroButton onClick={this.handleLogout} tip="LOGOUT" className="logout">
                    <LogoutIcon className="logout"/>

                    </SlydroButton>
                    
                    

                </div>
                </div>
                
        ) : (
            <div  className="footer-icons">
                <h3 className="title">Logged Out</h3>
            </div>
        )
        return(
            <Fragment>
                {footerMarkup}
            </Fragment>
            
        )
    }
    }

    const mapStateToProps = (state) => ({
        authenticated: state.slyder.authenticated
    })

export default connect(mapStateToProps, { logoutSlyder })(Footer);