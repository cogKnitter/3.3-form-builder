(function() {
  // All code NOT referencing DOM elements can go here
  var appFormXHR = new XMLHttpRequest()


  document.addEventListener("DOMContentLoaded", function(e){

    var webForm = document.querySelector("[data-js='webAppForm']")

    // ALL DOM RELATED QUERYING GOES HERE
    appFormXHR.addEventListener("load", function(e){
      formDataArray = JSON.parse(e.target.responseText)


      formDataArray.forEach(function(formField){
        if (formField.type === "select") {
          //open select tag
          var selectHTML = "<select class='formSelect'>"
          // loop over options
          formField.options.forEach(function(option){
            selectHTML += `<option value="${option.value}">${option.label}</option>`
          });
          //end select tag
            selectHTML += "</select>"
          // add to html
          webForm.innerHTML += selectHTML

        }
        else {
          webForm.innerHTML += `
          <label>
            <span class="fieldLabel">${formField.label}</span>
            <input class="formInput" type="${formField.type}" placeholder="${formField.label}" id="${formField.id}">
            <i class="${formField.icon}"></i>
          </label>
          `;
        };

      }); // ends formDataArray loop


      }); //ends xhr load
    }); // ends DOMContentLoaded






  appFormXHR.open("GET", "http://json-data.herokuapp.com/forms")
  appFormXHR.send()
}());
