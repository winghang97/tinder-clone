import {
  ErrorMessage,
  Field,
  FieldArray,
  FieldProps,
  Form,
  Formik,
  FormikHelpers,
  FormikProps,
} from "formik";
import * as Yup from "yup";
import api from "../lib/api";

type Props = {
  setToken: (token: string) => void;
};

interface MyFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: number;
  gender: string;
  university: string;
  interests: string[];
}

const RegisterPage = ({ setToken }: Props) => {
  const initialValues: MyFormValues = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: 0,
    gender: "male",
    university: "",
    interests: [""],
  };

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().required("required"),
    lastName: Yup.string().required("required"),
    email: Yup.string().email().required("required"),
    password: Yup.string().required("required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Password does not match")
      .required("required"),
    age: Yup.number().required("required"),
    university: Yup.string().required("required"),
  });

  const handleRegister = async (values: MyFormValues) => {
    const res = await api.post("/auth/register", {
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
      age: values.age,
      gender: values.gender,
      university: values.university,
      interests: JSON.stringify(values.interests),
    });

    const data = res.data;
    setToken(data.token);
    window.location.href = "/";
  };

  return (
    <div className="container mt-5">
      <Formik
        initialValues={initialValues}
        onSubmit={async (
          values: MyFormValues,
          { setSubmitting }: FormikHelpers<MyFormValues>
        ) => {
          handleRegister(values);
          setSubmitting(false);
        }}
        validationSchema={RegisterSchema}
      >
        {({ values, errors, touched }: FormikProps<MyFormValues>) => {
          return (
            <Form>
              <div className="mb-3">
                <label htmlFor="firstName">First Name</label>
                <Field
                  id="firstName"
                  name="firstName"
                  placeholder="John"
                  className="form-control"
                />
                {errors.firstName && touched.firstName ? (
                  <div className="text-danger mt-2">{errors.firstName}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="lastName">Last Name</label>
                <Field
                  id="lastName"
                  name="lastName"
                  placeholder="Doe"
                  className="form-control"
                />
                {errors.lastName && touched.lastName ? (
                  <div className="text-danger mt-2">{errors.lastName}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="email">Email</label>
                <Field
                  id="email"
                  name="email"
                  placeholder="John@example.com"
                  className="form-control"
                />
                {errors.email && touched.email ? (
                  <div className="text-danger mt-2">{errors.email}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="password">password</label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="password"
                  className="form-control"
                />
                {errors.password && touched.password ? (
                  <div className="text-danger mt-2">{errors.password}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  className="form-control"
                  placeholder="Confirm Password"
                />
                {errors.confirmPassword && touched.confirmPassword ? (
                  <div className="text-danger mt-2">
                    {errors.confirmPassword}
                  </div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="age">Age</label>
                <Field
                  id="age"
                  name="age"
                  render={({ field }: FieldProps) => (
                    <input
                      {...field}
                      type="number"
                      placeholder="0"
                      className="form-control"
                    />
                  )}
                />
                {errors.age && touched.age ? (
                  <div className="text-danger mt-2">{errors.age}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="gender">Gender</label>
                <Field
                  id="gender"
                  name="gender"
                  placeholder="John"
                  className="form-control"
                  as="select"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="others">Others</option>
                </Field>
                {errors.gender && touched.gender ? (
                  <div className="text-danger mt-2">{errors.gender}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="university">University</label>
                <Field
                  id="university"
                  name="university"
                  placeholder="Taylor's University"
                  className="form-control"
                />
                {errors.university && touched.university ? (
                  <div className="text-danger mt-2">{errors.university}</div>
                ) : null}
              </div>
              <div className="mb-3">
                <label htmlFor="interests">Interests</label>
                <FieldArray name="interests">
                  {({ remove, push }) => (
                    <div className="mb-3">
                      {values.interests.length > 0 &&
                        values.interests.map((_interest, i) => (
                          <div className="row mb-3" key={i}>
                            <div className="col-10">
                              <Field
                                name={`interests.${i}`}
                                type="text"
                                className="form-control"
                              />
                              <ErrorMessage
                                name={`interests.${i}`}
                                component="div"
                                className="field-error"
                              />
                            </div>
                            <div className="col">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => remove(i)}
                              >
                                X
                              </button>
                            </div>
                          </div>
                        ))}
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => push("")}
                      >
                        Add new Interest
                      </button>
                    </div>
                  )}
                </FieldArray>
              </div>
              <div className="d-grid gap-2 mb-3">
                <button type="submit" className="btn btn-primary">
                  Register
                </button>
              </div>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default RegisterPage;
