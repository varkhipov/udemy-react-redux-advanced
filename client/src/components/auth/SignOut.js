import React, { Component } from 'react';
import { connect } from 'react-redux';
import { signout } from '../../actions';


class SignOut extends Component {
  componentDidMount() {
    this.props.signout();
  }

  render() {
    return (
      <div>
        Come back!
      </div>
    );
  }
}

export default connect(
  null,
  { signout }
)(SignOut);
