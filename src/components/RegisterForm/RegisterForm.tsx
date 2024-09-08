import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { register } from "../redux/authUser/operationsUser.auth";
import scss from "./RegisterForm.module.scss";
import { AppDispatch } from "../redux/store";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export const RegisterForm: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Stan dla pól formularza i wiadomości błędów
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
        emailError = "E-mail musi mieć co najmniej 3 znaki przed znakiem @.";
      } else if (!domainPart) {
        emailError = "E-mail musi zawierać znak @.";
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
          password: "Hasło musi zawierać co najmniej 7 znaków.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "",
        }));
      }
    }

    // Sprawdzanie, czy hasła się zgadzają podczas wpisywania w polu "potwierdź hasło"
    if (name === "confirmPassword") {
      if (value !== formData.password) {
        setErrors((prevErrors) => ({
          ...prevErrors,
          confirmPassword: "Hasła nie pasują.",
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

    // Jeśli nie ma błędów, przejdź do rejestracji
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
      }); // Reset danych formularza
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
      <div className={scss["text"]}>Register Form</div>
      <form onSubmit={handleSubmit}>
        <div className={scss["field"]}>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Username"
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
            placeholder="E-mail"
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
            placeholder="Password"
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
            placeholder="Confirm password"
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
          <label className={scss["sign-up"]} htmlFor="checkboxPolicy">
            I accept the terms and conditions of the Privacy Policy
          </label>
        </div>
        <div className={scss["forgot-pass"]}>
          <a href="#">Forgot Password?</a>
        </div>
        <button type="submit" disabled={!isFormValid()}>
          Sign in
        </button>
        <div className={scss["sign-up"]}>
          <p>Already have an account?</p>
          <p>
            <a href="#"> Login now</a>
          </p>
        </div>
      </form>
    </div>
  );
};
