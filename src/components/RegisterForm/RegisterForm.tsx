import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AppDispatch } from "../redux/store";
import { useAuthUser } from "../hooksUser";
import { register } from "../redux/authUser/operationsUser.auth";
import { selectLanguage } from "../redux/language/selectorsLanguage";
import { langDictionary } from "../redux/language/constans";
import scss from "./RegisterForm.module.scss";
export const RegisterForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const currentLanguage = useSelector(selectLanguage);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  // useEffect(() => {
  //   toast(`ZadanieZFilmu: Witaj `, {
  //     position: "top-center",
  //     duration: 2500,
  //   });
  // }, [forms.login]);
  // Obsługa zmian w polach formularza
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;

    // Aktualizacja stanu danych formularza
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value, // Obsługa checkboxa
    }));

    // Sprawdzanie walidacji dla e-mail
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

    // Sprawdzanie walidacji dla hasła
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

    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword:
            langDictionary.confirmPasswordWarning[currentLanguage],
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "",
        }));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!errors.confirmPassword && !errors.email && !errors.password) {
      dispatch(
        register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      );
      e.currentTarget.reset();
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
  };
  const isFormValid = () => {
    return (
      formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      !errors.email &&
      !errors.password &&
      !errors.confirmPassword
    );
  };
  return (
    <div className={scss["content"]}>
      <div className={scss["text"]}>
        {langDictionary.registerFormTitle[currentLanguage]}
      </div>
      <form onSubmit={handleSubmit}>
        <div className={scss["field"]}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder={langDictionary.userField[currentLanguage]}
            autoComplete="username"
            required
          />
          <span className={`${(scss["fas"], "fa-user")}`}></span>
          {/* <label>Username</label> */}
        </div>

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
          <span className={`${(scss["fas"], "fa-user")}`}></span>
          {/* <label>E-mail</label> */}
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
            autoComplete="new-password"
            required
          />
          <span
            className={scss["eye-input-password"]}
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          {/* <label>Password</label> */}
          {errors.password && (
            <div className={`${scss["tooltip"]} ${scss["error"]}`}>
              {errors.password}
            </div>
          )}
        </div>

        <div className={scss["field"]}>
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={langDictionary.confirmPasswordField[currentLanguage]}
            autoComplete="new-password"
            required
          />
          <span
            className={scss["eye-input-password"]}
            onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </span>
          {/* <label>Confirm password</label> */}
          {errors.confirmPassword && (
            <div className={`${scss["tooltip"]} ${scss["error"]}`}>
              {errors.confirmPassword}
            </div>
          )}
        </div>
        <div className={scss["field-chackbox"]}>
          <input
            type="checkbox"
            name="checkboxPolicy"
            id="checkboxPolicy"
            required
          />
          <label className={scss["privacy-policy"]} htmlFor="checkboxPolicy">
            {langDictionary.privacyPolicy[currentLanguage]}
          </label>
        </div>
        <div className={scss["forgot-pass"]}>
          <a href="#">Forgot Password?</a>
        </div>

        <button type="submit" disabled={!isFormValid()}>
          {langDictionary.signUpButton[currentLanguage]}
        </button>

        <div className={scss["sign-up"]}>
          <p>{langDictionary.alreadyHaveAnAccountText[currentLanguage]}</p>
          <p>
            <a href="login"> {langDictionary.loginNowText[currentLanguage]}</a>
          </p>
        </div>
      </form>
    </div>
  );
};
