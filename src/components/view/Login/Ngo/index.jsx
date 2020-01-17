import React from "react";
import PropTypes from "prop-types";
import { BrowserRouter } from "react-router-dom";
import { Formik } from "formik";
import FormInput from "components/custom/Form/Input";
const Ngo = props => {
  return (
    <BrowserRouter>
      <Formik
        initialValues={{
          email: "",
          password: ""
        }}
        validate={values => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }

          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
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
          <form onSubmit={handleSubmit} className="loginForm">
            <FormInput
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={{
                borderRadius: "5px"
              }}
              value={values.email}
              style={{ height: 80, borderRadius: "5px" }}
            />
            <FormInput
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              inputStyle={{
                borderRadius: "5px"
              }}
              style={{ height: 80, borderRadius: "5px" }}
              value={values.password}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="__primary-btn loginSignIn"
            >
              Sign in
            </button>
            <div className="login_divider">
              <hr />
              <span>or</span>
              <hr />
            </div>

            <div className="sign__in__with">
              <div className="sign__in__with__facebook">
                <div className="signInIcon">
                  <i className="fa fa-facebook "></i>
                </div>
                <div className="signInWithContainer">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn __primary-btn loginSignIn withFacebookBtn"
                  >
                    Sign in with Facebook
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn __primary-btn loginSignIn"
                >
                  Sign in with Google
                </button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </BrowserRouter>
  );
};

Ngo.propTypes = {};

export default Ngo;
