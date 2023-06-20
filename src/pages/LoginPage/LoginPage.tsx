import { Form, Formik } from "formik";
import * as Yup from "yup";

import { CredentialsModel } from "../../models/auth.model";
import TextField from "../../components/text-field/TextField";
import Button from "../../components/button/Button";
import { authService } from "../../services/auth.service";

interface LoginPageProps {
  setToken: (token: string | null) => void;
}

const LoginPage = ({ setToken }: LoginPageProps) => {
  const handleSubmit = async (values: CredentialsModel) => {
    try {
      const { token } = await authService.login(values);
      setToken(token);
    } catch (e) {
      setToken(null);
    }
  };

  const initialValues: CredentialsModel = { email: "", password: "" };

  const schema = Yup.object().shape({
    email: Yup.string().email().required(),
    password: Yup.string().required(),
  });

  return (
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card shadow mt-3">
            <div className="card-body">
              <h5 className="card-title text-center">Sign in</h5>
              <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <TextField name="email" label="Email" className="mb-3" />
                  <TextField
                    name="password"
                    label="Password"
                    type="password"
                    className="mb-3"
                  />
                  <Button type="submit">Sign in</Button>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
