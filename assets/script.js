$(function () {

    var currentHour = moment().format("HH");
    var currentDate = moment().format("dddd, MMMM Do");
  
    //displays current date in the format of the .gif
    $("#currentDay").text(currentDate);
  
    // I'm going to test with hours past the business day since I'm doing my project past business hours 
    var militaryBusinessHoursOfTheDay = ["09", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19","20", "21", "22","23","24"];
  
    //added loop to create the timeblock rows using the militaryBusinessHoursOfTheDay array
    for (let i = 0; i < militaryBusinessHoursOfTheDay.length; i++) {
      //adds a row
      var newRow = $("<div class='row'>");
  
      //adds the hour timeblock
      var hourTimeblock = $("<div class='col-sm-1 hour'>").text(
        militaryBusinessHoursOfTheDay[i] + ":00"
      );
  
      //adds the textarea timeblock
      var userInputsNotes = $(
        "<textarea class='description col-sm-10 time-block'>"
      );
      // add metadata to the textarea
      userInputsNotes.attr("data-hour", militaryBusinessHoursOfTheDay[i]);
  
      // added past, present, future colors to the text areas
      if (userInputsNotes.attr("data-hour") < currentHour) {
        userInputsNotes.addClass("past");
      } else if (userInputsNotes.attr("data-hour") === currentHour) {
        userInputsNotes.addClass("present");
      } else {
        userInputsNotes.addClass("future");
      }
  
      //If the user's notes are saved, then display it again when the pages reloads
      if (localStorage.getItem(militaryBusinessHoursOfTheDay[i]) != null) {
        userInputsNotes.text(localStorage.getItem(militaryBusinessHoursOfTheDay[i]));
      }

      //add the save button
      var saveButton = $("<button class='col-sm-1 saveBtn'>");
      var saveLock = $("<i class='fas fa-save'>");
      saveButton.append(saveLock);
     
      //My new notes weren't saving over my old notes when I reloaded the page. This should fix that. 
      saveButton.attr("data-hour", militaryBusinessHoursOfTheDay[i]);

      //append the timeblock, the notes, and save button and the new row together and to the container div
       newRow.append(hourTimeblock, userInputsNotes, saveButton);
       $(".container").append(newRow);
    }
  

      //stores new notes when the respective save button is clicked
      $(document).on("click", ".saveBtn", function (event) {
        var storeHour = $(this).attr("data-hour");
        var storeText = $(this).siblings(".description").val();
    
        localStorage.setItem(storeHour, storeText);
      });
  });