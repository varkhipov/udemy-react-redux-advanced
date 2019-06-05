import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signin } from './../../actions';
import { reduxForm, Field } from 'redux-form';


class SignIn extends Component {
  onSubmit = formProps => {
    this.props.signin(formProps, () => {
      this.props.history.push('/feature');
    });
  };

  render() {
    const { handleSubmit } = this.props;

    return (
      <form className="ui form" onSubmit={handleSubmit(this.onSubmit)}>
        <fieldset>
          <label>Email</label>
          <Field name="email" type="text" component="input" className="field" autoComplete="off" />
        </fieldset>
        <fieldset>
          <label>Password</label>
          <Field name="password" type="password" component="input" className="field" autoComplete="off" />
        </fieldset>
        <div>{this.props.errorMessage}</div>
        <button className="ui button primary">Submit</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return {
    errorMessage: state.auth.errorMessage
  }
}

export default compose(
  connect(mapStateToProps, { signin }),
  reduxForm({ form: 'signin' })
)(SignIn);
