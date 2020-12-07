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

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmitLogin = this.handleSubmitLogin.bind(this);

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
      }
    };
    this.UserApiHandler = new UserService();

  }

  handleSubmitLogin(e) {
    e.preventDefault();

    try {
      let signinDetails = {
        email: this.state.email,
        password: this.state.password
      }
      this.UserApiHandler.getUserSignin(signinDetails, (response) => {
        if (response) {
          console.log("Signin response : ", response);
          localStorage.setItem("access-token", response.token);
          window.location.href = "/dashboard"
        } else {
          this.setState({
            error_signin_messgae: 'Incorrect Email/Password!'
          })
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  handleSubmit = e => {
    e.preventDefault();

    if (formValid(this.state)) {
      console.log(`
        --SUBMITTING--
        First Name: ${this.state.firstName}
        Last Name: ${this.state.lastName}
        Email: ${this.state.email}
        Password: ${this.state.password}
      `);
    } else {
      console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
    }
  };

  handleChange(event) {
    const state = this.state;
    state[event.target.name] = event.target.value;
    this.setState(state);
  }

  // handleChange = e => {
  //   e.preventDefault();
  //   const { name, value } = e.target;
  //   let formErrors = { ...this.state.formErrors };

  //   switch (name) {
  //     case "firstName":
  //       formErrors.firstName =
  //         value.length < 3 ? "minimum 3 characaters required" : "";
  //       break;
  //     case "lastName":
  //       formErrors.lastName =
  //         value.length < 3 ? "minimum 3 characaters required" : "";
  //       break;
  //     case "email":
  //       formErrors.email = emailRegex.test(value)
  //         ? ""
  //         : "invalid email address";
  //       break;
  //     case "password":
  //       formErrors.password =
  //         value.length < 6 ? "minimum 6 characaters required" : "";
  //       break;
  //     default:
  //       break;
  //   }

  //   this.setState({ formErrors, [name]: value }, () => console.log(this.state));
  // };

  render() {
    const { formErrors } = this.state;
    return (
      <div className="wrapper">
        <div className="form-wrapper">
          <h1>Login</h1>
          <form onSubmit={this.handleSubmitLogin} noValidate>

            <div className="email">
              <label htmlFor="email">Email</label>
              <input
                // className={formErrors.email.length > 0 ? "error" : null}
                placeholder="Email"
                type="email"
                name="email"
                noValidate
                value={this.state.email}
                onChange={this.handleChange}
                inputProps={{ minLength: 5 }}
              />
            </div>
            <div className="password">
              <label htmlFor="password">Password</label>
              <input
                placeholder="Password"
                type="password"
                name="password"
                value={this.state.password}
                noValidate
                onChange={this.handleChange}
              />

            </div>
            <div className="createAccount">
              <button type="submit">Login</button>
            </div>
            <p>{this.state.error_signin_messgae}</p>
          </form>
        </div>
      </div>

    );
  }
}


export default Login;
