import React from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link, useHistory } from "react-router-dom";
import * as Yup from "yup";
import TwitterLogo from "../styles/assets/twitter-logo.png";

const LOGIN_MUTATION = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  email: string;
  password: string;
}

const initialValues: SignupValues = {
  email: "",
  password: "",
};

export default function Login() {
  const history = useHistory();
  const [login, { data }] = useMutation(LOGIN_MUTATION);

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password Required"),
  });

  console.log('data', data)

  return (
    <div style={{width: 500}}>
        <img src={TwitterLogo} alt="logo" style={{width: "50px"}} className="logo" />
      <h3>Login</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);

        //   const response = await login({
        //     variables: value,
        //   });

          var response: any
          try {
            response = await login({
                variables: value,
              });
          } catch (e) {
              console.error('eeee', e)
                alert('wrong password')
                return (<>wrong passoword</>)
          }

          console.log('response', response)

          localStorage.setItem("token", response.data.login.token);
          setSubmitting(false);
          history.push("/");
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />

          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} />

          <button type="submit" className="login-button"><span>Login</span></button>
        </Form>
      </Formik>
      <div className="register">
          <h4>Don't have an account?</h4>
          <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
}
