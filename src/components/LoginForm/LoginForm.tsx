import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../redux/authUser/operationsUser.auth";
import scss from "./LoginForm.module.scss";
import { AppDispatch } from "../redux/store";
import { FaEye, FaEyeSlash, FaUser, FaRegEnvelope } from "react-icons/fa";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import {
  selectErrorConnection,
  selectIsLoggedIn,
} from "../redux/authUser/selectorsUser.auth";
import toast from "react-hot-toast";
export const LoginForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);
  const errorConnection = useSelector(selectErrorConnection);
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    console.log("LoginForm -> handleSubmit->errorConnection", errorConnection);
    if (isLoggedIn && errorConnection === null) {
      setFormData({
        email: "",
        password: "",
      });
    }
    if (errorConnection) {
      const number = errorConnection
        ? parseInt(errorConnection.match(/\d+/)?.[0] || "", 10)
        : null;
      if (number === 400) {
        toast(
          `${langDictionary.loginFormErrorConnection400[currentLanguage]} `,
          {
            position: "top-center",
            duration: 4000,
          },
        );
      } else {
        toast(`${errorConnection}`, {
          position: "top-center",
          duration: 4000,
        });
      }
    }
  }, [errorConnection]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Obsługa checkboxa
    }));

    if (name === "email") {
      const [localPart, domainPart] = value.split("@");
      let emailError = "";
      if (!localPart || localPart.length < 3) {
        emailError = langDictionary.emailWarning[currentLanguage];
      } else if (!domainPart) {
        emailError = langDictionary.emailWarning2[currentLanguage];
      } else {
        emailError = "";
      }

      setErrors((prevErrors) => ({
        ...prevErrors,
        email: emailError,
      }));
    }

    if (name === "password") {
      if (value.length < 7) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: langDictionary.passwordWarning[currentLanguage],
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errors.email && !errors.password) {
      dispatch(
        logIn({
          email: formData.email,
          password: formData.password,
        }),
      );
    }
  };

  const isFormValid = () => {
    return (
      formData.email && formData.password && !errors.email && !errors.password
    );
  };

  return (
    <div className={scss["content"]}>
      <div className={scss["text"]}>
        {langDictionary.loginFormTitle[currentLanguage]}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={scss["field"]}>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder={langDictionary.emailField[currentLanguage]}
            autoComplete="email"
            required
          />
          <span className={`${scss["icons-input"]} `}>
            <FaRegEnvelope />
          </span>
          {errors.email && (
            <div className={`${scss["tooltip"]} ${scss["error"]}`}>
              {errors.email}
            </div>
          )}
        </div>

        <div className={scss["field"]}>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder={langDictionary.passwordField[currentLanguage]}
            autoComplete="current-password"
            required
          />
          <span
            className={`${scss["icons-input"]} ${scss["eye-input-password"]}`}
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          {errors.password && (
            <div className={`${scss["tooltip"]} ${scss["error"]}`}>
              {errors.password}
            </div>
          )}
        </div>

        <button type="submit" disabled={!isFormValid()}>
          {langDictionary.signInButton[currentLanguage]}
        </button>

        <div className={scss["sign-up"]}>
          <p>{langDictionary.dontHaveAnAccountText[currentLanguage]}</p>
          <p>
            <a href="register">
              {langDictionary.registerNowText[currentLanguage]}
            </a>
          </p>
        </div>
      </form>
    </div>
  );
  // franekdolas@gmail.com

  //   franekdolas2024
  //     <label className={scss.label}>
  //       Email
  //       <input type="email" name="email" ref={emailRef} />
  //     </label>
  //     <label className={scss.label}>
  //       Password
  //       <input type="password" name="password" ref={passwordRef} />
  //     </label>
  //     <button type="submit">Log In</button>

  //   </form>
  // );
};
