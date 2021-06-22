// import { renderUserContent, textInputValidation } from "./common.js";
$(function () {
    $("table tbody").text("");
    $.ajax({
      url: "/cart",
      type: "GET",
      dataType: "json",
      error: () => console.log("Không thể tải được sữ liệu"),
      success: (cart) => {
        if (cart.length > 0) {
          cart.forEach((cart) => {
            $("table tbody").append(renderUserContent(cart));
          });
          reorderUsersList();
        } else {
        }
      },
    });
  
    let form = document.forms.addUserForm;
    $(form).on("submit", (e) => {
      e.preventDefault();
      saveNewUser(form);
    });
  
    let editForm = document.forms.editUserForm;
    $(editForm).on("submit", (e) => {
      e.preventDefault();
      saveEditUser($(editForm).data().userId, editForm);
    });
  });
  
  function saveNewUser(form) {
    let flag = true;
    flag = textInputValidation(form.elements.img, flag);
    flag = textInputValidation(form.elements.title, flag);
    flag = textInputValidation(form.elements.address, flag);
    flag = textInputValidation(form.elements.parameter, flag);
    flag = textInputValidation(form.elements.price, flag);
    flag = textInputValidation(form.elements.prepay, flag);
    if (flag) {
      let img = $(form.elements.img).val().trim(),
        title = $(form.elements.title).val().trim(),
        address = $(form.elements.address).val().trim(),
        parameter = $(form.elements.parameter).val().trim(),
        price= $(form.elements.price).val().trim(),
        prepay = $(form.elements.prepay).val().trim();

      $.ajax({
        url: "/cart",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ img,title,address,parameter,price,prepay }),
        success: function (result) {
          $("table tbody").append(renderUserContent(result));
          form.reset();
          $(form).find("input").removeClass("is-valid");
          $("#addUser").modal("hide");
          reorderUsersList();
        },
      });
    }
  }
  
  function saveEditUser(id, form) {
    let flag = true;
    flag = textInputValidation(form.elements.img, flag);
    flag = textInputValidation(form.elements.title, flag);
    flag = textInputValidation(form.elements.address, flag);
    flag = textInputValidation(form.elements.parameter, flag);
    flag = textInputValidation(form.elements.price, flag);
    flag = textInputValidation(form.elements.prepay, flag);
    if (flag) {
        let img = $(form.elements.img).val().trim(),
        title = $(form.elements.title).val().trim(),
        address = $(form.elements.address).val().trim(),
        parameter = $(form.elements.parameter).val().trim(),
        price= $(form.elements.price).val().trim(),
        prepay = $(form.elements.prepay).val().trim();
      $.ajax({
        url: "/cart/" + id,
        type: "PUT",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({ img,title,address,parameter,price,prepay}),
        success: function (result) {
          form.reset();
          $("#editUser").modal("hide");
          $(form).data().tr.replaceWith(renderUserContent(result));
          reorderUsersList();
        },
      });
    }
  }
  
  function renderUserContent(cart) {
    let tr = $("<tr />", {
      class: "user-row",
      html: `
          <td class="text-center order-state"></td>
          <td>${cart.img}</td>
          <td>${cart.title}</td>
          <td>${cart.address}</td>
          <td>${cart.parameter}</td>
          <td>${cart.price}</td>
          <td>${cart.prepay}</td>
          <td></td>
          `,
    });
    tr.children().last().append(editBtn(cart, tr), delBtn(cart.id, tr));
    return tr;
  }
  
  function editBtn(cart, tr) {
    let a = $("<a />", {
      class: "text-info mr-3",
      html: `<i class="fa fa-edit" aria-hidden="true"></i> Sửa`,
    });
    a.attr("data-toggle", "modal");
    a.attr("data-target", "#editUser");
  
    a.on("click", function () {
      let edit = document.forms.editUserForm;
      $(edit.elements.img).val(cart.img);
      $(edit.elements.title).val(cart.title);
      $(edit.elements.address).val(cart.address);
      $(edit.elements.parameter).val(cart.parameter);
      $(edit.elements.price).val(cart.price);
      $(edit.elements.prepay).val(cart.prepay);
  
      $(edit).data({ userId: cart.id, tr: tr });
    });
  
    return a;
  }
  
  function delBtn(id, tr) {
    let a = $("<a />", {
      class: "text-danger",
      html: `<i class="fa fa-trash" aria-hidden="true"></i> Xóa`,
    });
    a.on("click", (e) => {
      e.preventDefault();
      $.ajax({
        url: "/cart/" + id,
        type: "DELETE",
        success: (res) => {
          tr.remove();
          reorderUsersList();
        },
      });
    });
    return a;
  }
  
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
  
  function reorderUsersList() {
    $(".user-row").each(function (index) {
      $(this)
        .find(".order-state")
        .text(index + 1);
    });
  }
  