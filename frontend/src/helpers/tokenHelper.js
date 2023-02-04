export const tokenExpired = (token) => {
  // If token does not exist, return true
  if (!token) {
    return false;
  }
  try {
    // Split the token into an array of strings, separated by dots
    const tokenParts = token.split('.');

    // Get the string from the second part of the token (after the first dot)
    const base64Url = tokenParts[1];

    // Replace the - and _ characters with + and /, respectively
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');

    // Decode the base64 string to get the JSON payload
    const payload = JSON.parse(window.atob(base64));

    // Get the expiration time from the "exp" claim in the payload
    const expirationTime = payload.exp;

    // Convert the expiration time to a date object
    const expirationDate = new Date(0);
    expirationDate.setUTCSeconds(expirationTime);

    // Get the current date
    const currentDate = new Date();

    // Check if the token is expired
    return currentDate >= expirationDate;
  } catch (error) {
    return false;
  }
};
