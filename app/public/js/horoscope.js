const logOutBtn=$("#logOutBtn");
const backBtn = $("#backbtn")



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



backBtn.on("click", function(event){
    event.preventDefault();
    window.location.replace("/members");
})



