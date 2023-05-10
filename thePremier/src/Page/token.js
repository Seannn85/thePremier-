const cookies = document.cookie.split(";");

for (let i = 0; i < cookies.length; i++) {
  const cookie = cookies[i].trim();

  if (cookie.startsWith("access_token=")) {
    const token = cookie.substring("access_token=".length, cookie.length);
    // do something with the token
    break;
  }
}
