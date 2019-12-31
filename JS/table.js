/*  Name: Aaditya Mukherjee
    email: aaditya_mukherjee@student.uml.edu
    GUI Programming I, Assignment 8
    Sources: https://www.youtube.com/watch?v=zhxQhgm4yk4&t=200s    (The first two sources were used to figure out how to make multiplication tables with for loops)
           : https://www.youtube.com/watch?v=zhxQhgm4yk4&t=200s
           : https://github.com/jquery-validation/jquery-validation/issues/2030 (This page was used to make the greaterThan function)
           : https://www.w3schools.com/
           : https://api.jqueryui.com/theming/icons/
           : hhtps://github.com/         (Helped immensely to make the tabs section of this assignment)
*/

var numoftables = 1;         //keep the count of the number of tables generated
function submit_form() {    //function to submit the forms dynamically
  $("#formname").submit();
  }



$.validator.addMethod( "greaterThan", function( value, element, param ) {   //greaterThan function from github
  var target = $( param );

  if ( this.settings.onfocusout && target.not( ".validate-greaterThan-blur" ).length ) {
      target.addClass( "validate-greaterThan-blur" ).on( "blur.validate-greaterThan", function() {
          $( element ).valid();
      } );
  }
  return Number(value) >= Number(target.val());

});


$(function() {                  //Wait for page to be ready then load.
  $("#formname").validate({
    rules: {
      min_row: {       //All four inputs are given restrictions which it will follow, or the table won't load.
        required: true,       //An input is required
        digits: true         //It needs to be a positive integer, no decimals, no negative numbers

       },
       min_column: {
         required: true,
         digits: true

       },


      max_column: {
        required: true,
        digits: true,
        greaterThan: [min_column, min_column]    //greaterThan function applied to check if upper limit is greater than lower limit
      },


      max_row: {
        required: true,
        digits: true,
        greaterThan: [min_row, min_row]
      }
    },


    messages: {                                   //Custom error messages for invalid inputs based on the rules
      min_column: {
            required: "This field is required.",
            digits: "A positive integer is required."



    },
      min_row: {
            required:"This field is required.",
            digits:"A positive integer is required."

          },


      max_column: {
        required: "This field is required.",
        digits: "A positive integer is required.",
        greaterThan: "Enter a value greater than minimum column value."
      },


      max_row: {
        required: "This field is required.",
        digits: "A positive integer is required.",
        greaterThan: "Enter a value greater than minimum row value. "
      }
    },

    submitHandler: function(form){              //table generates after handling all errors
        generate();
    }
  });
});




function generate() {                      //function for generating the multiplication table

  var h1 = Number(document.getElementById("min_column").value);
  var h2 = Number(document.getElementById("max_column").value);

  var v1 = Number(document.getElementById("min_row").value);
  var v2 = Number(document.getElementById("max_row").value);

  var output = "<tr><th> </th>";

for(var i = h1; i <= h2; i++){

output += "<th>" + i + "</th>";  //adds values for columns

}

output += "</tr>";

for(var j = v1; j <= v2; j++) {

output += "<tr><th>" + j + "</th>"; //adds values for rows

for(var k = h1; k <= h2; k++) {

output += "<td>" + j*k + "</td>"; //Table cells get filled with the appropriate calculations of the column and row heads

}

output += "</tr>";

}


var table = document.getElementById("multi_table").innerHTML = output;  //assign the table to html id

}

$(function(){                         //Implementation of JQuery UI sliders

  $("#min_col_slider").slider({       //slider created for respective input block

    animate: true,
    slide: function(event, ui){
      $("#min_column").val(ui.value);  //this function implements value change of minimum column input box with respect to min_col_slider
      submit_form();                //auto-submit the form so table forms as soon as input is set
    }
  });

  $("#min_column").change(function(){    //change function used for two-way inding

    $("#min_col_slider").slider("value",$(this).val()); //sliders will change based on number typed
    submit_form();
  });

  $("#max_col_slider").slider({         //slider created for respective input block

    animate: true,
    slide: function(event, ui){
      $("#max_column").val(ui.value);
      submit_form();
    }
  });

  $("#max_column").change(function(){     //change function used for two-way inding

    $("#max_col_slider").slider("value",$(this).val());
    submit_form();
  });

  $("#min_row_slider").slider({     //slider created for respective input block

    animate: true,
    slide: function(event, ui){
      $("#min_row").val(ui.value);
      submit_form();
    }
  });

  $("#min_row").change(function(){    //change function used for two-way inding

    $("#min_row_slider").slider("value",$(this).val());
    submit_form();
  });

  $("#max_row_slider").slider({       //slider created for respective input block

    animate: true,
    slide: function(event, ui){
      $("#max_row").val(ui.value);
      submit_form();
    }
  });

  $("#max_row").change(function(){      //change function used for two-way inding

    $("#max_row_slider").slider("value",$(this).val());
    submit_form();
  });


});



function table_tabs() {       //Function called when table is saved. Tabs are made from the table and new tabs are made as the user keeps adding on to it. Most of this was taken from Github.com

  numoftables++;
   $("#tabs").tabs();

    var c1 = Number(document.getElementById("min_column").value);
    var c2 = Number(document.getElementById("max_column").value);

    var r1 = Number(document.getElementById("min_row").value);
    var r2 = Number(document.getElementById("max_row").value);


    var top = "<li class='tab'><a href='#tab-" + numoftables + "'>" + c1 + " x " + c2 + " , " + r1 + " x " + r2 + "</a>" + "<span class='ui-icon ui-icon-circle-close'></span>" + "</li>";
    $("div#tabs ul").append(top); //tab heading consisting of table dimensions
    $( "div#tabs" ).append('<div id="tab-' + numoftables + '">' + $("#tableu").html() + '</div>');

    $("#tabs").tabs("refresh");
    $("#tabs").tabs("option", "active", -1);

$("#tabs").on( "click", "span.ui-icon-circle-close", function() { //function to delete the tabs when clicked on the close icon

    $( "#" + $( this ).closest( "li" ).remove().attr( "aria-controls" ) ).remove();
    $("#tabs").tabs("refresh");;
  });
}
