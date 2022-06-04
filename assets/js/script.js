var timeLabel = ["#09time", "#10time", "#11time", "#12time", "#13time", "#14time", "#15time", "#16time", "#17time"]
var textAreas = ["#09block", "#10block", "#11block", "#12block", "#13block", "#14block", "#15block", "#16block", "#17block",]
var timeTextList = []

var saveButtonIDs = ['#save09', '#save10', '#save11', '#save12', '#save13', '#save14', '#save15', '#save16', '#save17']
var saveButtonArray = []

var myinput = []

//create queryselectors for each .saveBtn and set localstorage item myinput+i equal to the content of the textarea
document.querySelectorAll(".saveBtn").forEach(function (element) {
    element.addEventListener("click", function (event) {
        event.preventDefault()
        hourNumber = event.target.id.substring(4,6)
        hourBlock = "#" + hourNumber + "block"
        myinput[parseInt(hourNumber) - 9] = $(hourBlock).val()
        localStorage.setItem("myinput" + (parseInt(hourNumber) - 9), JSON.stringify(myinput[parseInt(hourNumber) - 9]))
    })
})

//if myinput+i exists, parse info from myinput+i in localstrage and return that value to the textarea 
var savedInfoArray = []
for (var i = 0; i < saveButtonIDs.length; i++) {
    if ("myinput" + i) {
        savedInfoArray[i] = JSON.parse(localStorage.getItem("myinput" + i))
        $(textAreas[i]).val(savedInfoArray[i])
    }
}
//use clear button to clear all local storage and all text areas
var clearButton = $(".clear-btn")
clearButton.on("click", function(event){
    localStorage.clear()
    for (var i = 0; i < saveButtonIDs.length; i++) {
        $(textAreas[i]).val("")
    }
})

// set currentDay text to current day via moment
$("#currentDay").text(moment().format("MMMM Do, YYYY"))
var currentHour = moment().format("H")


// for each time block, change its styling/color based on whether it is before, after, or at the current hour
for (var i = 0; i < timeLabel.length; i++) {
    timeTextList[i] = $(timeLabel[i]).text()
    var blockTime = parseInt(textAreas[i].substring(1,3))
    if (currentHour > blockTime) {
        $(textAreas[i]).attr("class", "past")
    } else if (currentHour == blockTime) {
        $(textAreas[i]).attr("class", "present")
    } else if (currentHour < blockTime) {
        $(textAreas[i]).attr("class", "future")
    }
}

