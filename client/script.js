$(document).ready(() => {
  const elements = {
    aboutText: $("#about-text"),
    dataDiv: $("#dataDiv"),
    signUpBtn: $("#signUpBtn"),
    signUpSection: $("#signUp"),
    register: $("#register"),
    email: $("#email1"),
    password: $("#password"),
    confirmPassword: $("#confirmPassword"),
    menuToggle: $(".menu-toggle"),
    dropZone: $("#drop_zone"),
    gallery: $("#uploadedImage"),
    fileInput: $("#fileInput"),
    uploadForm: $("#uploadForm"),
  };

  // Helper function to prevent default behavior and stop propagation
  const preventDefaultBehavior = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  // Toggle burger menu visibility

  elements.menuToggle.click(() => {
    const menu = $(".links-list");

    // Ensure "Sign Up" is only added once
    if (menu.find("a[href='#signUp']").length === 0) {
      menu.append(`<li><a class="nav-link" href="#signUp">Sign Up</a></li>`);
    }

    menu.toggleClass("show-menu"); 
  });

  // Use event delegation to handle clicks on all <li>, including dynamically added ones
  $(".links-list").on("click", "li", () => {
    $(".links-list").removeClass("show-menu");
  });

  // Prevent default behavior on drag events to stop page refresh
  $(window).on("dragover drop", preventDefaultBehavior);

  // Handle drop zone events
  elements.dropZone.on("dragover dragleave", (e) => {
    preventDefaultBehavior(e);
    elements.dropZone.toggleClass("hover", e.type === "dragover");
  });

  // Handle file drop event
  elements.dropZone.on("drop", (e) => {
    preventDefaultBehavior(e);
    let files = e.originalEvent.dataTransfer.files;
    handleFiles(files);
  });

  // Handle file input change event
  elements.fileInput.on("change", function () {
    const files = elements.fileInput[0].files;
    handleFiles(files);
  });

  // Handle form submission for file upload
  elements.uploadForm.on("submit", function (e) {
    e.preventDefault();
    const files = elements.fileInput[0].files;
    if (files.length > 0) handleFiles(files);
  });

  //  Fetch uploaded files
  $.ajax({
    type: "GET",
    url: "http://localhost:8008/files",
    success: (data) => {
      elements.gallery.append(
        data.files
          .map((fileUrl) => `<img class="uploaded-img" src="${fileUrl}" />`)
          .join("")
      );
    },
    error: () => alert("Failed to fetch the data. Please try again."),
  });

  async function handleFiles(files) {
    const uploadPromises = Array.from(files).map((file) => uploadFile(file));
    try {
      await Promise.all(uploadPromises);
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  }

  // Upload files using jQuery AJAX
  function uploadFile(file) {
    const formData = new FormData();
    formData.append("file", file);

    return $.ajax({
      url: "http://localhost:8008/upload",
      method: "POST",
      data: formData,
      contentType: false,
      processData: false,
      success: function (data) {
        const $img = $("<img>")
          .attr("src", `http://localhost:8008/uploads/${data.filename}`)
          .addClass("img-thumbnail");
        elements.gallery.append($img);
      },
      error: function (error) {
        console.error("Error uploading file:", error);
        alert("Failed to upload the file. Please try again.");
      },
    });
  }

  // Register new user
  elements.register.on("click", () => {
    const userData = {
      email: elements.email.val(),
      password: elements.password.val(),
      confirmPassword: elements.confirmPassword.val(),
    };

    $.ajax({
      type: "POST",
      url: "http://localhost:8008/api/users",
      contentType: "application/json",
      data: JSON.stringify(userData),
      success: () => alert("New user was created successfully"),
      error: () => alert("Failed to create a new user. Please try again."),
    });
  });

  // Fetch external API data
  $.ajax({
    type: "GET",
    url: "http://numbersapi.com/1/30/date?json",
    success: (data) => {
      elements.aboutText.append(data.text);

      const info = [
        { label: "Year", value: data.year },
        { label: "Number", value: data.number },
        { label: "Found", value: data.found },
        { label: "Type", value: data.type },
      ];

      elements.dataDiv.append(
        info
          .map(
            (item) =>
              `<div class="dataBox"><h3>${item.label}</h3><p>${item.value}</p></div>`
          )
          .join("")
      );
    },
    error: () => alert("Failed to fetch the data. Please try again."),
  });
});
