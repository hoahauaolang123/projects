function saveEditUser(form) {
    let flag = true;
    flag = textInputValidation(form.elements.name,flag);
    flag = textInputValidation(form.elements.password,flag);
  
    if (flag) {
        let name = $(form.elements.name).val().trim();
      let password = $(form.elements.password).val().trim();
       
      $.ajax({
        url: "/key/1",
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({name,password}),
        success: function () {
          form.reset();
          $("#editUser").modal("hide");
        },
      });
    }
  }
  $(function () {
    let editForm = document.forms.editUserForm;
    $(editForm).on("submit", (e) => {
      e.preventDefault();
      saveEditUser(editForm);
    });
  });
  function textInputValidation(fieldInput, flag) {
    let inputContent = $.trim($(fieldInput).val().trim());
    if (inputContent != "") {
      $(fieldInput).addClass("is-valid");
      $(fieldInput).removeClass("is-invalid");
    } else {
      $(fieldInput).removeClass("is-valid");
      $(fieldInput).addClass("is-invalid");
      flag = false;
    }
    return flag;
  }
  document.getElementById("logout").onclick = function () {
        location.href = "http://localhost:3000/login.html";}