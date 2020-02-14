// var moment = require('moment');

$(`#btn1`).on("click", function() {
    event.preventDefault();
    console.log("Success!")
    // alert();
    let date = $(`#dp1`).val()
    console.log(date);
    let splitDate=date.split("-");
    // let NewNew = moment(date).format(`mm-dd-yyyy`)
    // console.log(NewNew);
    let today = moment();
    console.log(today);
})