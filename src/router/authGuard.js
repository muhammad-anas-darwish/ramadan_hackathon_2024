import { ref } from "vue";

function checkCookie(name) {
	let cookieArr = document.cookie.split(";");
	
	for(let i = 0; i < cookieArr.length; i++) {
			let cookiePair = cookieArr[i].split("=");
			
			if(name == cookiePair[0].trim()) {
					return true
			}
	}
	
	return false;
}

export function isAuthenticate(to, from, next) {
  if (!checkCookie('anas')) {
    next({ name: "Register" });
  } else {
    next()
  }
}

export function isGuest(to, from, next) {
  if (checkCookie('anas')) {
    next({ path: "/401" });
  } else {
		next();
	}
}
