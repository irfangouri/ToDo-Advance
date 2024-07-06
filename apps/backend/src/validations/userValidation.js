const zod = require('zod');

const usernameSchema = zod.string().email();
const passwordSchema = zod.string().min(6);

const authValidation = (username, password) => {
  const usernameResponse = usernameSchema.safeParse(username);
  if (!usernameResponse.success) {
    return {
      error: 'Please enter a valid email id',
    };
  }

  const passwordResponse = passwordSchema.safeParse(password);
  if (!passwordResponse.success) {
    return {
      error: 'Password must be at least 6 characters long'
    };
  }

  return
}

module.exports = authValidation;