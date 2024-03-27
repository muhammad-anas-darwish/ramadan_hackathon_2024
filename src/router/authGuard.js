import { ref } from "vue";

// return value of cookie by name or false if there is no cookie 
export function checkCookie(name) {
  let cookieArr = document.cookie.split(";");

  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");

    if (name == cookiePair[0].trim()) {
      return cookiePair[1].trim();
    }
  }

  return false;
}

// pass user to page if user is authorize
export function isAuthenticate(to, from, next) {
  if (!checkCookie("Authorization")) {
    next({ name: "Register" });
  } else {
    next();
  }
}

// pass user to page if user is guest
export function isGuest(to, from, next) {
  if (checkCookie("Authorization")) {
    next({ path: "/401" });
  } else {
    next();
  }
}
