import React from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

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

  return (
    <div>
      <h1>Login</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);
          const response = await login({
            variables: value,
          });
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

          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
}
