

logo = "--------------------  Blackfriars Classified Research Facility  --------------------\n\n";

welcome = "Welcome Colonel Dormer, ID# 55293193 \n\n\
Time Since Last Login: 331 months, 21 days and 12 hours.\n\n\
-----------------------------------------------------------";

story1 = "<!-- hey dave, mike here. I'm knocking off for the weekend, tho ive set up a temp pass phrase of 909091 so you can still access the mainframe, we better do a proper authentication thingey this before we send it off to blackfriars, you know how they get haha. -->";

cursor = '<span class="blinking_cursor">&#9611</span>';

newline = "\n> "
buffer = [welcome + "\n\nIT IS GOOD TO SEE YOU AGAIN, SIR"];
current_buff = ''
state = 0;

function draw_termie() {
  if(state == 0)
  {
    $('#content').html(story1 + logo + "Enter Identification Passphrase: \n\n" + current_buff + cursor);

  } else if(state == 1)
  {
    buffer_contents = ''
    for(i = 0; i < buffer.length; i++){
      if(i >= 0){buffer_contents += buffer[i] + "\n";};
    }

    $('#content').html(logo + buffer_contents + newline + current_buff + cursor);

  }
}

function termie_print(string){
  draw_termie();

}

function comprehension(current_buff) {
  console.log(current_buff);
  if(current_buff == "clear"){
    buffer = [welcome];
  }
  if(current_buff == "logout"){
    state = 0;

    draw_termie();
  }
}

$( document ).ready(function() {
  draw_termie();

  $(document).keydown(function(e){

    if(e.keyCode == 32){            // Space
      current_buff += ' ';
      e.preventDefault();

    } else if(e.keyCode == 9){      // Tab
      current_buff += '    ';
      e.preventDefault();

    } else if(e.keyCode == 8){      // Backspace
      current_buff = current_buff.substring(0,current_buff.length - 1);
      e.preventDefault();

    } else if(e.keyCode == 13){     // Enter

      if(state == 1){
        buffer.push(newline + current_buff);
        comprehension(current_buff);
        current_buff = '';
      } else if(state == 0){
        if(current_buff == 909091){
          current_buff = '';
          state = 1
        }
      }
      e.preventDefault();
    }

    draw_termie();
  });

  $(document).keypress(function(e){
    current_buff += String.fromCharCode(e.keyCode);

    console.log(buffer);
    draw_termie();
  });

});
