import "../template/styles.css";

// fetch index home
console.log(window.location.origin);
fetch(window.location.origin + "/idx")
  .then((r) => r.json())
  .then((d) => console.log(d.message));

