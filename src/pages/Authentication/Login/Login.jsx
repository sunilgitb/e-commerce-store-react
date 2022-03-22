import { useState } from "react";
import { Navbar } from "../../../components/Navbar/Navbar";
import { Footer } from "../../../components/Footer/Footer";
import "../styles.css";
import { useAuth } from "../../../contexts/authContext";
import { loginService } from "../../../services/loginService";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginInput, setLoginInput] = useState({});
  const [hide, setHide] = useState({ pwd: true });

  const { setIsAuth, setToken, navigate } = useAuth();

  const loginInputHandler = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const loginHandler = async (e) => {
    e.preventDefault();

    try {
      const { data } = await loginService(loginInput);

      localStorage.setItem("token", data.encodedToken);
      setToken(data.encodedToken);

      setLoginInput({ email: "", password: "" });
      setIsAuth(true);

      navigate(-1);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />

      <section className="main-section login-container">
        <div className="card-wrapper basic-card card-text-only">
          <div>
            <div className="card-heading">Log In</div>
          </div>

          <div className="card-content">
            <form className="form-group" onSubmit={loginHandler}>
              <div className="input-group input input-primary">
                <label className="input-label">
                  Email<span>*</span>
                </label>
                <input
                  type="email"
                  placeholder="Type here..."
                  name="email"
                  value={loginInput.email || ""}
                  onChange={loginInputHandler}
                  required
                />
              </div>
              <div className="input-group input input-primary">
                <label className="input-label">
                  Password<span>*</span>
                </label>
                <div className="toggle-pwd">
                  <input
                    type={`${hide.pwd ? "password" : "text"}`}
                    placeholder="Type here..."
                    name="password"
                    value={loginInput.password || ""}
                    onChange={loginInputHandler}
                    required
                  />
                  <i
                    className={`fa-solid ${
                      hide.pwd ? "fa-eye" : "fa-eye-slash"
                    }`}
                    onClick={() => setHide({ ...hide, pwd: !hide.pwd })}
                  ></i>
                </div>
              </div>

              <div className="input-group input-checkbox checkbox-forgetpwd">
                <label className="input-label">
                  <input type="checkbox" /> Remember Me
                </label>
                <a
                  href="/pages/forget-pwd.html"
                  className="link-primary forgot-pwd"
                >
                  <span className="primary">Forgot Password?</span>
                </a>
              </div>

              <button className="btn btn-primary" type="submit">
                Log In
              </button>
            </form>
          </div>

          <div className="card-action">
            <span>New to Loafer? </span>
            <Link to="/signup" className="link">
              SignUp
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export { Login };
