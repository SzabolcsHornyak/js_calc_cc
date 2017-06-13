var first_val = '';
var second_val = '';
var decimal_in = false;
var value_in = false;
var operators = ['+','-','*','/','='];
var numbers = ['1','2','3','4','5','6','7','8','9','0','.','%'];
var selected_op = '';
var dot_in = false;
var percentage_in = false;
var display = document.querySelector('.screen').innerHTML;
var result_on_screen = false;


function contains(a, obj) {
	// This function check if the value(a) in the array(obj)
	var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}


function succes_operation(input_operator,value_a,value_b){
	// This function make the calculation
	if (value_a=="." || value_b==".")
	{
		clear_screen();
		alert("Invalid operation!");
		return false;
	}
	// parsing values
	if (value_a.toString().indexOf('.') != -1) {value_a = parseFloat(value_a);} else {value_a = parseInt(value_a);}
	if (value_b.toString().indexOf('.') != -1) {value_b = parseFloat(value_b);} else {value_b = parseInt(value_b);}
	if ((value_b===0 || value_b===0.0) && input_operator=='/')
	{
		alert("OPEN WORMHOLE!");
		clear_screen();
	}
	else
	{
		var last_calc_screen = value_a + ' ' + input_operator + ' ' + value_b;
		document.querySelector('.last_screen').innerHTML = last_calc_screen;
		
		switch(input_operator)
		{
			case '+': {display = value_a + value_b;} break;
			case '-': {display = value_a - value_b;} break;
			case '*': {display = value_a * value_b;} break;
			case '/': {display = value_a / value_b;} break;
		}
		document.querySelector('.screen').innerHTML = display;
		first_val = display;
		second_val = '';
		value_in = true;
		result_on_screen = true;
		percentage_in = false;
	}
}


function clear_screen(){
	// Clear screen
	first_val = '';
	second_val = '';
	value_in = false;
	document.querySelector('.screen').innerHTML = '';
	document.querySelector('.last_screen').innerHTML = '';
	result_on_screen = false;
	dot_in = false;
	percentage_in = false;
	}
	

function select_operator(input_op){
	document.querySelector('.screen').innerHTML += ' ' + input_op + ' '; 
	selected_op=input_op; 
	value_in = true; 
	dot_in = false;
}


function percentage(value){
	//parsing value
	if (value.toString().indexOf('.') != -1) {value = parseFloat(value);} else {value = parseInt(value);}
	return value/100;
}


function main() {
  $('span').on('click', function() 
	{
		var butVal = this.innerHTML;
		var lastchar = document.querySelector('.screen').innerHTML.slice(-1);
		
			if (contains(operators,butVal) && (lastchar!=" " || butVal=='='))
			{
				// if one operator added to the calculation
				if (value_in && first_val!='' && second_val!='' && selected_op!='')
				{
					succes_operation(selected_op,first_val,second_val);
				}
				if (butVal!="=") {select_operator(butVal);}
				
			} else if (butVal==='C') // Clear input
			{
				clear_screen();
			} else if (contains(numbers,butVal)){
					if (result_on_screen && (lastchar!=" "))
					{
						clear_screen();		
					} else
					{ result_on_screen = false;}
					
					if ((butVal!="." || dot_in==false) && (percentage_in == false || butVal!="%"))
					{
						if (value_in) // value input
						{
							if (butVal == '%') 
								{second_val = percentage(second_val); percentage_in = true; dot_in = true;} 
							else
								{ second_val += butVal; }
							document.querySelector('.screen').innerHTML += butVal;
						}
						else
						{
							if (butVal == '%') 
								{first_val = percentage(first_val); percentage_in = true; dot_in = true;} 
							else
								{ first_val += butVal; }
							document.querySelector('.screen').innerHTML += butVal;
						}
					}
					if (butVal==".") {dot_in = true;}
				}
	}
	);
}

$(document).ready(main); //if the documents ready