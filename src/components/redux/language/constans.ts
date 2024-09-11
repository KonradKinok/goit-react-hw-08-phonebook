export enum Languages {
  EN = "en",
  PL = "pl",
}

export const langDictionary = {
    //Nav
    navPhonebook: {
        [Languages.EN]: "Phonebook",
        [Languages.PL]: "Książka telefoniczna",
    },
    navHome: {
        [Languages.EN]: "Home",
        [Languages.PL]: "Start",
    },
    navContacts: {
        [Languages.EN]: "Contacts",
        [Languages.PL]: "Kontakty",
    },
    navWelcome: {
        [Languages.EN]: "Welcome",
        [Languages.PL]: "Witaj",
    },
    navLogOut: {
        [Languages.EN]: "Log Out",
        [Languages.PL]: "Wyloguj się",
    },
    navRegister: {
        [Languages.EN]: "Register",
        [Languages.PL]: "Zarejestruj się",
    },
    navLogIn: {
        [Languages.EN]: "Log In",
        [Languages.PL]: "Zaloguj się",
    },
    
    // RegisterForm
    registerFormTitle: {
        [Languages.EN]: "Register form",
        [Languages.PL]: "Formularz rejestracyjny",
    },
    emailWarning: {
        [Languages.EN]: "Email must have at least 3 characters before the @ sign.",
        [Languages.PL]: "E-mail musi mieć co najmniej 3 znaki przed znakiem @.",
    },
    emailWarning2: {
        [Languages.EN]: "E-mail must contain the @ sign.",
        [Languages.PL]: "E-mail musi zawierać znak @.",
    },
    passwordWarning: {
        [Languages.EN]: "The password must contain at least 7 characters.",
        [Languages.PL]: "Hasło musi zawierać co najmniej 7 znaków.",
    },
    confirmPasswordWarning: {
        [Languages.EN]: "The passwords don't match.",
        [Languages.PL]: "Hasła nie pasują.",
    },
    userField: {
        [Languages.EN]: "Username",
        [Languages.PL]: "Nazwa użytkownika",
    },
    emailField: {
        [Languages.EN]: "E-mail",
        [Languages.PL]: "E-mail",
    },
    passwordField: {
        [Languages.EN]: "Password",
        [Languages.PL]: "Hasło",
    },
    confirmPasswordField: {
        [Languages.EN]: "Confirm password",
        [Languages.PL]: "Potwierdź hasło",
    },
    privacyPolicy: {
        [Languages.EN]: "Accepting ridiculously long terms and conditions that no one reads anyway, called Privacy Policies.",
        [Languages.PL]: "Akceptowanie absurdalnie długich warunków, których i tak nikt nie czyta, zwanych Polityką Prywatności.",
    },
    signUpButton: {
        [Languages.EN]: "Sign up",
        [Languages.PL]: "Zarejestruj się",
    },
    alreadyHaveAnAccountText: {
        [Languages.EN]: "Already have an account?",
        [Languages.PL]: "Masz już konto?",
    },
    loginNowText: {
        [Languages.EN]: "Login now",
        [Languages.PL]: "Zaloguj się teraz",
    },
    // RegisterForm errors
    errorConnection400: {
        [Languages.EN]: "Request failed with status code 400. It is possible that the email address has already been used.",
        [Languages.PL]: "Żądanie nie powiodło się, kod statusu 400. Prawdopodobnie adres e-mail został już użyty.",
    },

    // LoginForm
    loginFormTitle: {
        [Languages.EN]: "Login form",
        [Languages.PL]: "Formularz logowania",
    },
    signInButton: {
        [Languages.EN]: "Sign in",
        [Languages.PL]: "Zaloguj się",
    },
    dontHaveAnAccountText: {
        [Languages.EN]: "Don't have an account yet?",
        [Languages.PL]: "Nie masz jeszcze konta?",
    },
    registerNowText: {
        [Languages.EN]: "Register now",
        [Languages.PL]: "Zarejestruj się teraz",
    },
    // LoginForm errors
    loginFormErrorConnection400: {
        [Languages.EN]: "Request failed with status code 400. Email address or password is invalid.",
        [Languages.PL]: "Żądanie nie powiodło się, kod statusu 400. Adres e-mail lub hasło są nieprawidłowe.",
    },
    tableId: {
        [Languages.EN]: "Id",
        [Languages.PL]: "Lp",
    },
    tableName: {
        [Languages.EN]: "Name",
        [Languages.PL]: "Nazwa"
    },
    tableNumber: {
        [Languages.EN]: "Number",
        [Languages.PL]: "Numer"
    },
    tableAction: {
        [Languages.EN]: "Actions",
        [Languages.PL]: "Akcje"
    },
}