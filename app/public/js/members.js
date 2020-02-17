const newDogBtn = $("#newDogBtn");
const logOutBtn=$("#logOutBtn");
const modalAction = $("#modalAction");
const modalClose = $("#modalClose");
const modalName = $("#modalName")
const modalBreed = $("#modalBreed")
const modalBday = $("#modalBday")


$(document).ready(function() {

logOutBtn.on("click", function(event){
    event.preventDefault(); 

    $.get("/logout", function(req, res){
        // console.log(res);
        console.log("Logging out!")
    })
    // .then(function() {
    //     window.location.replace("/landingPage")
    // })
    // .catch(function(err) {
    //     console.log(err);
    //     })
});



    // This file just does a GET request to figure out which user is logged in
    // and updates the HTML on the page
//     async function getID() {$.get("/api/user_data").then(function(data) {
// console.log(data.id)
//     });
// }
$.get("/api/user_data").then(function(data) {
    console.log(data.id)
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



// function sortSign(birthday) {
//    let parseBirthday = dayjs.extend(customParseFormat)
//         dayjs(birthday, "YYYY-MM-DD")
//          console.log(parseBirthday);
//         return parseBirthday;
   
// };









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

