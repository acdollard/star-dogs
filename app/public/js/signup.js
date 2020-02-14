$(document).ready(function() {
    // Getting references to our form and inputs
    var loginForm = $("#signUpBtn");
    var emailInpt = $("#emailInpt");
    var passwordInpt = $("#passInpt");
  
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("click", function(event) {
      event.preventDefault();
      let userData = {
        email: emailInpt.val().trim(),
        password: passwordInpt.val().trim()
      };
  
      if (!userData.email || !userData.password) {
        return;
      }

      console.log("We here!")
  
      // If we have an email and password we run the loginUser function and clear the form
      loginUser(userData.email, userData.password);
      emailInpt.val("");
      passwordInpt.val("");
    });
  
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
    function loginUser(email, password) {
      $.post("/api/signup", {
        email: email,
        password: password
      })
        .then(function() {
          console.log("HI");
          window.location.replace("/members");
          // If there's an error, log the error
        })
        .catch(function(err) {
          console.log(err);
        });
    }
  });