import React from "react";
import { gql, useMutation } from "@apollo/client";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";

const SIGNUP_MUTATION = gql`
  mutation signup($name: String, $email: String!, $password: String!) {
    signup(name: $name, email: $email, password: $password) {
      token
    }
  }
`;

interface SignupValues {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

const initialValues: SignupValues = {
  email: "",
  password: "",
  confirmPassword: "",
  name: "",
};

export default function Signup() {
  const history = useHistory();
  const [signup, { data }] = useMutation(SIGNUP_MUTATION);

  const validateSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(4, "More than 4 characters please")
      .max(20, "Must be 20 characters or less")
      .required("Password Required"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password")],
      "Passwords must match"
    ),
    name: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Name Required"),
  });

  return (
    <div>
      <h1>Sign Up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validateSchema}
        onSubmit={async (value, { setSubmitting }) => {
          setSubmitting(true);
          const response = await signup({
            variables: value,
          });
          localStorage.setItem("token", response.data.signup.token);
          setSubmitting(false);
          history.push("/");
        }}
      >
        <Form>
          <Field name="email" type="text" placeholder="Email" />
          <ErrorMessage name="email" component={"div"} />

          <Field name="name" type="text" placeholder="Name" />
          <ErrorMessage name="name" component={"div"} />

          <Field name="password" type="password" placeholder="Password" />
          <ErrorMessage name="password" component={"div"} />

          <Field
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
          />
          <ErrorMessage name="confirmPassword" component={"div"} />

          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
}
