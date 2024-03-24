const isStrongPassword = (password) => {
    // Regular expressions to check for at least one uppercase letter, one lowercase letter, one digit, and one special character
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    
    // Check if the password meets all criteria
    return (
      password.length >= 8 &&  // Minimum length of 8 characters
      uppercaseRegex.test(password) &&  // At least one uppercase letter
      lowercaseRegex.test(password) &&  // At least one lowercase letter
      digitRegex.test(password) &&      // At least one digit
      specialCharRegex.test(password)   // At least one special character
    );
  };

  module.exports = isStrongPassword;  