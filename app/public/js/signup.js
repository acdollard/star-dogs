$(document).ready(function() {
    // Getting references to our form and inputs
    const loginForm = $("#signUpBtn");
    const emailInpt = $("#emailInpt");
    const passwordInpt = $("#passInpt");
    const nameInpt = $("#nameInpt")
    // When the form is submitted, we validate there's an email and password entered
    loginForm.on("click", function(event) {
      event.preventDefault();
      let userData = {
        name: nameInpt.val().trim(),
        email: emailInpt.val().trim(),
        password: passwordInpt.val().trim(),

      };
  
      if (!userData.email || !userData.password) {
        return;
      }

      console.log("We here!");


  
      //pass the SignUp function the input texts as params and logIn function as callback
       signUpUser(userData.name, userData.email, userData.password);
       logInUser(userData.name, userData.email, userData.password);

      //clear inputs
      emailInpt.val("");
      passwordInpt.val("");
    });
    
    
    // sign up function takes in email, password, and callback function
     function signUpUser(name, email, password, next) {
      $.post("/api/signup", {
        name: name,
        email: email,
        password: password
      })
      .then(function () {
        console.log("You're Signed Up");
        next();
      })
      .catch(function(err) {
        console.log(err);
      })
    }
    
    
    // log in function 
     function logInUser(email, password) {
      $.post("/api/login", {
        email: email,
        password: password
      })
      .then(function() {
        console.log("You're logged in!")
        window.location.replace("/members");
      })
      .catch(function(err) {
        console.log(err);
      })
    }

    function dogLogin(){
      var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://api.TheDogAPI.com/v1/images/search?q=air",
        "method": "GET",
        "headers": {
          "x-api-key": "88a10272-d2d1-4931-841b-7ac799becfd8"
        }
      }
      $.ajax(settings).then(function (response) {
        console.log(response[0].url);
        $('#myimage').attr('src',response[0].url);
        $('#myimage').attr("width","400");
        $('#myimage').attr("height","400");
      });
    };
    $(document).ready(function(){
      dogLogin();
      });

  
  
  
  });
    
