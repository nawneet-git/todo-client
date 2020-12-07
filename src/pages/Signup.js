import React, { Component } from "react";
import "./Signup.css";
import UserService from '../services/profile';

const emailRegex = RegExp(
  /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);

const formValid = ({ formErrors, ...rest }) => {
  let valid = true;

  // validate form errors being empty
  Object.values(formErrors).forEach(val => {
    val.length > 0 && (valid = false);
  });

  // validate the form was filled out
  Object.values(rest).forEach(val => {
    val === null && (valid = false);
  });

  return valid;
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmitRegister = this.handleSubmitRegister.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      firstName: "",
      lastName: null,
      email: "",
      password: null,
      formErrors: {
        firstName: "",
        lastName: "",
        email: "",
        password: ""
      },
      errorMessage: ''
    };
    this.UserApiHandler = new UserService();

  }

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      try {
        let signupDetails = {
          password: this.state.password,
          email: this.state.email,
          first_name: this.state.firstName,
          last_name: this.state.lastName
        }
        console.log("signupDetails ", signupDetails)
        this.UserApiHandler.getUserSignUp(signupDetails, (response) => {

          if (response) {
            console.log("Signin response : ", response);

            localStorage.setItem("access-token", response.token);
            window.location.href = "/login"
          } else {
            this.setState({
              // error_signup_messgae: 'Please enter correct email!'
            })
          }
        });
      } catch (err) {
        console.log("error = ", err.response);
      }
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleSubmitRegister(e) {
    e.preventDefault();

    if (formValid(this.state)) {
      try {
        let signupDetails = {
          password: this.state.password,
          email: this.state.email,
          first_name: this.state.firstName,
          last_name: this.state.lastName
        }
        console.log("signupDetails ", signupDetails)
        this.UserApiHandler.getUserSignUp(signupDetails, (response) => {
          if (response) {
            console.log("Signin response : ", response);
            localStorage.setItem("access-token", response.token);
            window.location.href = "/dashboard"
          } else {
            this.setState({
              errorMessage: "Email is already registered!"
            })
          }
        });
      } catch (err) {
        console.log("error = ", err.status);
        if (err.status && err.status == 400) {
          this.setState(
            {
              errorMessage: "Email is already registered!"
            }
          )
        }
      }
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Create Account</h1>
          <form onSubmit={this.handleSubmitRegister} noValidate>
            <div className="firstName">
              <label htmlFor="firstName">First Name</label>
              <input
                className={formErrors.firstName.length > 0 ? "error" : null}
                placeholder="First Name"
                type="text"
                name="firstName"
                noValidate
                onChange={this.handleChange}
                value={this.state.firstName}
              />
              {formErrors.firstName.length > 0 && (
                <span className="errorMessage">{formErrors.firstName}</span>
              )}
            </div>
            <div className="lastName">
              <label htmlFor="lastName">Last Name</label>
              <input
                className={formErrors.lastName.length > 0 ? "error" : null}
                placeholder="Last Name"
                type="text"
                name="lastName"
                noValidate
                onChange={this.handleChange}
                value={this.state.lastName}
              />
              {formErrors.lastName.length > 0 && (
                <span className="errorMessage">{formErrors.lastName}</span>
              )}
            </div>
            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                onChange={this.handleChange}
                value={this.state.email}
              />
              {formErrors.email.length > 0 && (
                <span className="errorMessage">{formErrors.email}</span>
              )}
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                className={formErrors.password.length > 0 ? "error" : null}
                placeholder="Password"
                type="password"
                name="password"
                noValidate
                onChange={this.handleChange}
                value={this.state.password}
              />
              {formErrors.password.length > 0 && (
                <span className="errorMessage">{formErrors.password}</span>
              )}
            </div>
            <div className="createAccount">
              <button type="submit">Create Account</button>
              <small>Already Have an Account?</small>
            </div>
            <p>{this.state.errorMessage}</p>
          </form>

        </div>


      </div>


    );
  }
}



export default Signup;