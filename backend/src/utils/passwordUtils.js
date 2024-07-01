
const checkPasswordStrength = async (password) => {
    // implement your password strength checking logic here
    // return true if password is strong enough, false otherwise

    const MIN_PASSWORD_LENGTH = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/.test(password);

    return (
        password.length >= MIN_PASSWORD_LENGTH &&
        hasUpperCase &&
        hasLowerCase &&
        hasNumbers &&
        hasSpecialChars
    );


}



module.exports = { checkPasswordStrength };