export default function serialize(form) {
  if (!form || form.nodeName !== "FORM") {
    return;
  }
  let result = {};
  for (let i = 0; i < form.elements.length - 1; i++) {
    if (form.elements[i].name === "") continue
    result[form.elements[i].name] = []
  }
  for (let i = 0; i < form.elements.length - 1; i++) {
    if (form.elements[i].name === "") {
      continue;
    }
    switch (form.elements[i].type) {
      case 'checkbox':
      case 'radio':
        if (form.elements[i].checked) {
          result[form.elements[i].name].push(encodeURIComponent(form.elements[i].value))
        } else {
          result[form.elements[i].name].push("")
        }
        break;
    }
  }
  return result;
}



