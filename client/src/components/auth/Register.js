import React, { Fragment, useState } from "react";
// request to back-end
// import axios from "axios";
import { Link, Redirect } from "react-router-dom";
// connect
import { connect } from "react-redux";
import { setAlert } from "../../actions/alert";
import PropTypes from "prop-types";
import { register } from "../../actions/auth";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    if (password !== password2) {
      // console.log("Passwords do not match");
      // call the setAlert in root/client/src/actions/alert.js
      setAlert("Passwords do not match", "danger");
    } else {
      // we have extracted those from earlier, in formData
      register({ name, email, password });
      // console.log("Registration Success!");
      // this whole process of making request to back-end will be implemented with redux
      // const newUser = {
      //   name,
      //   email,
      //   password;
      // };
      // try {
      //   // remeber when we use Postman and we specify in Headers tab?
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json"
      //     }
      //   };
      //   const body = JSON.stringify(newUser);
      //   // we hit the route where we create new user
      //   const res = await axios.post("/api/users", body, config);
      //   // see what the back-end server sends back
      //   console.log(res.data);
      // } catch (err) {
      //   console.log(err.response.data);
      // }
    }
  };

  if (isAuthenticated) {
    return <Redirect to="/dashboard" />
  }

  return (
    <Fragment>
      <h1 className="large text-primary">Sign Up</h1>
      <p className="lead">
        <i className="fas fa-user"></i> Create Your Account
      </p>
      <form className="form" onSubmit={e => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="Name"
            name="name"
            value={name}
            onChange={e => onChange(e)}
          // required
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={e => onChange(e)}
          // required
          />
          <small className="form-text">
            This site uses Gravatar so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            name="password"
            // minLength="6"
            value={password}
            onChange={e => onChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="password2"
            // minLength="6"
            value={password2}
            onChange={e => onChange(e)}
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register" />
      </form>
      <p className="my-1">
        Already have an account? <Link to="/login">Sign In</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(
  mapStateToProps,
  { setAlert, register }
)(Register);
