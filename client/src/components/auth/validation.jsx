const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/;
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateInput = (name, value) => {
  if (name === 'username') {
    return usernameRegex.test(value);
  } else if (name === 'email') {
    return emailRegex.test(value);
  } else if (name === 'password') {
    return passwordRegex.test(value);
  } else if (name === 'confirmPassword') {
    return true;
  }
};

export default validateInput;
