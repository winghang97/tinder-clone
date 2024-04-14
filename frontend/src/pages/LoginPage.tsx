import { Field, Form, Formik, FormikHelpers, FormikProps } from "formik";
import { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import * as Yup from "yup";
import api from "../lib/api";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

type Props = {
  setToken: (userToken: string) => void;
};

interface MyFormValues {
  email: string;
  password: string;
}

const LoginPage = ({ setToken }: Props) => {
  const nav = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().required("required"),
    password: Yup.string().required("required"),
  });
  const initialValues: MyFormValues = { email: "", password: "" };

  const handleLogin = async (values: MyFormValues) => {
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      const data = res.data;
      setToken(data.token);
      nav("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMessage(error.response!.data.error);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container margin-top-vh">
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: MyFormValues,
          { setSubmitting }: FormikHelpers<MyFormValues>
        ) => {
          handleLogin(values);
          setSubmitting(false);
        }}
        validationSchema={LoginSchema}
      >
        {({ errors, touched }: FormikProps<MyFormValues>) => {
          return (
            <Form>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="abcd@example.com"
                  className="form-control"
                />
                {errors.email && touched.email ? (
                  <div className="text-danger mt-2">{errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password">Password</label>
                <Field
                  type="password"
                  name="password"
                  placeholder="abcd@example.com"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div className="text-danger mt-2">{errors.password}</div>
                ) : null}
              </div>
              <div className="mb-3 d-grid gap-2">
                <button
                  type="submit"
                  className="btn btn-primary "
                  disabled={loading}
                >
                  {loading ? <Spinner size="sm" /> : "Login"}
                </button>
              </div>
              {errorMessage && (
                <Alert variant="danger">
                  <div className="text-center">{errorMessage}</div>
                </Alert>
              )}
              <div className="row">
                <div className="col-6">
                  <a href="/register">Register</a>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default LoginPage;
