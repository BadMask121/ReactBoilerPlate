import React from "react";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import FormInput from "components/custom/Form/Input";
const index = ({ handleSubmit, ...props }) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: ""
      }}
      {...props}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting

        /* and other goodies */
      }) => (
        <form className="loginForm">
          <FormInput
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            onBlur={handleBlur}
            inputStyle={{
              borderRadius: "5px"
            }}
            value={values.email}
            style={{ height: 80, borderRadius: "5px" }}
          />
          <div>
            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={{
                borderRadius: "5px"
              }}
              style={{ height: 80, borderRadius: "5px" }}
              value={values.password}
            />
            <span className="forgotPassword">
              <NavLink to="forgot">Forgot</NavLink>
            </span>
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="__primary-btn loginSignIn"
            onClick={handleSubmit}
          >
            Sign in
          </button>
          <div className="login_divider">
            <hr />
            <span>or</span>
            <hr />
          </div>

          <div className="sign__in__with__container">
            <div className="sign__in__with facebook">
              <div className="signInIcon">
                <i className="fa fa-facebook "></i>
              </div>
              <div className="signInWithBtnContainer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn loginSignIn withBtn"
                >
                  Sign in with Facebook
                </button>
              </div>
            </div>

            <div className="sign__in__with google">
              <div className="signInIcon">
                <i className="fa fa-google "></i>
              </div>
              <div className="signInWithBtnContainer">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn loginSignIn withBtn"
                >
                  Sign in with google
                </button>
              </div>
            </div>
          </div>
          <p className="createaccount">
            Don't have an account?{" "}
            <NavLink to="/signup">Create Account</NavLink>
          </p>
        </form>
      )}
    </Formik>
  );
};
export default index;
