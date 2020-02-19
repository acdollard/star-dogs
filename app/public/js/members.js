const newDogBtn = $("#newDogBtn");
const logOutBtn=$("#logOutBtn");
const modalAction = $("#modalAction");
const modalClose = $("#modalClose");
const modalName = $("#modalName");
const modalBreed = $("#modalBreed");
const modalBday = $("#modalBday");
const tableBody = $("#tableBody");
const horoscopeRow = $(".horoscopeButton");
const welcome = $("#welcome_banner");







$(document).ready(function() {

$.get("/api/user_data").then(function(data) {
    console.log(data.id);
    welcome.text("Welcome " + data.name + "!");
        }); 

getDogs();

function getDogs() {
    $.get("/api/dogs", function(res){
      let buttonId = "";
      //code for adding dog rows to table
        console.log(res);
      for(let i=0; i<res.length; i++) {
        let row = $("<tr>");
        row.attr("id", res[i].id);
        let nameData = $("<td>");
        let signData = $("<td>");
        let scopeBtn = $("<button>");
        scopeBtn.attr("id", res[i].sign);
        let buttonId = scopeBtn.id;
        scopeBtn.text("Get Horoscope");
        nameData.text(res[i].name);
        signData.text(res[i].sign);
        row.append(nameData);
        row.append(signData);
        row.append(scopeBtn);
        tableBody.append(row);


        getHoroscope(res[i].sign);
            }

            
    })
}


// horoscopeRow.on("click", function(event) {
//   event.preventDefault();
//   console.log("yo.")
//   $.get("api/horoscopes", function(req, res) {
//     console.log(res);
//   })
// })


logOutBtn.on("click", function(event){
    event.preventDefault(); 
    $.get("/logout", function(req, res){
        // console.log(res);
        console.log("Logging out!")
    })
    .then(function() {
        console.log("members.js window.location.replace test")
        window.location.replace("/");
    })
    .catch(function(err) {
        console.log(err);
        })
});



//click listener for creating a new dog
modalAction.on("click", function(event) {
    event.preventDefault();
    console.log("Bam!");

    let newDog = {
        name: modalName.val().trim(),
        breed: modalBreed.val().trim(),
        bDay: modalBday.val()
    };

    $.get("/api/user_data").then(function(data) {
        console.log(data.id)
            });
    
    
    $.post("/api/dogs", {
        name: newDog.name,
        breed: newDog.breed,
        bDay: newDog.bDay,
        // UserID: data.id
    }).then(function() {
        console.log("New Dog Created!");
        window.location.replace("/members");
        // If there's an error, log the error
    })
    .catch(function(err) {
        console.log(err);
    });
})
});



function getHoroscope(buttonId){
  document.getElementById(buttonId).addEventListener("click", function(){
  event.preventDefault();
    console.log("yo.")
    console.log(buttonId)
    $.get("api/horoscopes/" + buttonId).then(function(res) {

      console.log(res);

     }) 
    })
  }




var openmodal = document.querySelectorAll('.modal-open')
    for (var i = 0; i < openmodal.length; i++) {
      openmodal[i].addEventListener('click', function(event){
    	event.preventDefault()
    	toggleModal()
      })
    }
    
    const overlay = document.querySelector('.modal-overlay')
    overlay.addEventListener('click', toggleModal)
    
    var closemodal = document.querySelectorAll('.modal-close')
    for (var i = 0; i < closemodal.length; i++) {
      closemodal[i].addEventListener('click', toggleModal)
    }
    
    document.onkeydown = function(evt) {
      evt = evt || window.event
      var isEscape = false
      if ("key" in evt) {
    	isEscape = (evt.key === "Escape" || evt.key === "Esc")
      } else {
    	isEscape = (evt.keyCode === 27)
      }
      if (isEscape && document.body.classList.contains('modal-active')) {
    	toggleModal()
      }
    };
    
    
    function toggleModal () {
      const body = document.querySelector('body')
      const modal = document.querySelector('.modal')
      modal.classList.toggle('opacity-0')
      modal.classList.toggle('pointer-events-none')
      body.classList.toggle('modal-active')
    }

