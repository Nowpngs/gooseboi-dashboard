export const tokenExpired = (token, minutesBeforeExpired = 120) => {
  // If token does not exist, return true
  if (!token) {
    return true;
  }
  try {
    // Get the string from the second part of the token (after the .)
    const base64URL = token.split('.')[1];
    // Replace the - and _ characters with + and /, respectively
    const base64 = base64URL.replace('-', '+').replace('_', '/');
    // Decode the base64 string
    const tokenJson = JSON.parse(window.atob(base64));
    // Create a new Date object and set the time to the token's expiration time
    const expiryDate = new Date(0);
    expiryDate.setUTCSeconds(tokenJson.exp);
    // Create a new Date object and set the time to now
    const nowDate = new Date();
    // Return true if the token is within the specified number of minutes of expiring
    return (
      nowDate.getTime() >
      expiryDate.getTime() - 1000 * (60 * minutesBeforeExpired)
    );
  } catch (error) {
    // If there's an error, return true
    return true;
  }
};
