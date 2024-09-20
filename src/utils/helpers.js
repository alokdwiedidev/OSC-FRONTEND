import Swal from "sweetalert2";

export const handleAlerts = (title, message, icon, callBack = () => {}) => {
  return Swal.fire({
    title: title,
    text: message,
    icon: icon,
  }).then((result) => callBack(result));
};

export const handleHideEmail = (email) => {
    return `${email.slice(0, 3)}*****${email.slice(
      email.indexOf("@"),
      email.length
    )}`;
}

export const handleScrollIntoView = (id = "", block = "start") => {
  const ele = document.getElementById(id)
  if(!ele) {
    return console.error(`element was not found`)
  }
  ele.scrollIntoView({block, behavior: "smooth"})
}