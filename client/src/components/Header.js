import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class Header extends Component {
  rendeLinks() {
    if (this.props.authenticated) {
      return (
        <React.Fragment>
          <Link to="/signout" className="item">Sign Out</Link>
          <Link to="/feature" className="item">Feature</Link>
        </React.Fragment>
      )
    }
    else {
      return (
        <React.Fragment>
          <Link to="/signup" className="item">Sign Up</Link>
          <Link to="/signin" className="item">Sign In</Link>
        </React.Fragment>
      )
    }
  }

  render() {
    return (
      <div className="ui secondary pointing menu">
        <Link to="/" className="item">Redux Auth</Link>
        {this.rendeLinks()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  }
}

export default connect(
  mapStateToProps
)(Header);
