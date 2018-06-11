/* To do list 

1. ADD THE NEW CONTACT[name, phonenumber, email]
	1.1.	Validate the contact
	1.2		clear  the form
*/






////// cache the DOM


var appContent = document.getElementById('app-content');
var contactName = document.getElementById('contactName');
var contactPhone = document.getElementById('contactPhone');
var contactEmail = document.getElementById('contactEmail');
var addBtn = document.getElementById('addBtn');
var searchQuery = document.getElementById('searchQuery');
var searchBtn = document.getElementById('searchBtn');
var previousBtn = document.getElementById('previousBtn');
var nextBtn = document.getElementById('nextBtn');
//create a storage array
var phoneBook = [];

//Add contact 

var addNewContact =function(event)
{
	event.preventDefault();
	if(validateContact()){
		// prepare contact data
            var newContact = {
                "name": contactName.value,
                "phone": contactPhone.value,
                "email": contactEmail.value,
            };
            // add a new object
            phoneBook.push(newContact);
            // storing the array data in JSON formate in HTML5 browser local storage
            localStorage['app-content'] = JSON.stringify(phoneBook)
            //console.log(phoneBook);

// re-render the view
            render(phoneBook);



            // reset form values
            clearForm();
	};
}




















///////////////Event Listners

addBtn.addEventListener('click',addNewContact);








////////////////Helper functions

// contact validation
var validateContact = function()
{
	var result = true;
	// validate contactName
	if(contactName.value.length > 99) 
	{
		alert('Name cannot be more than 100 characters');
		result = false;
	}
	// validate contactNumber

	var phonePattern = /^\d{2}-\d{3}-\d{4}$/;;
	var phoneResult = phonePattern.test(contactPhone.value);
	if(!phoneResult)
	{
		alert('Invalid Phone Number! Please enter a correct number (ex:  22-333-4444)');
        result = false;
	}

	// validate emailAddress
	 var emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
      var emailResult = emailPattern.test(contactEmail.value);
      if(!emailResult)
      {
      	alert('Invalid email format! Please add a correct email (ex: john@doe.com)');
        result = false;
      }

      return result;
}
//responsible to display contact details in DOM

var render = function (data) {
        if (data && data.length > 0) {
            var htmlTemplate = '';
            data.forEach(function (contact, index) {
                htmlTemplate +=
                    '<tr class="contact-data">' +
                    '<td class="contact-index">' + index + '</td>' +
                    '<td class="contact-name">' + contact.name + '</td>' +
                    '<td class="contact-phone">' + contact.phone + '</td>' +
                    '<td class="contact-email">' + contact.email + '</td>' +
                    '<td class="contact-action"><button type="button" class="btn btn-danger btn-sm btn-remove"><span class="glyphicon glyphicon-remove"></span> Delete</button></td>' +
                    '</tr>';
            });
            appContent.innerHTML = '<table class="table table-striped"><thead><tr><th class="contact-index">Index</th><th class="contact-name">Name</th><th class="contact-phone">Phone</th><th class="contact-email">Email</th><th class="contact-action">Action</th></tr></thead><tbody>' + htmlTemplate + '</tbody></table>';
        }
        else {
            appContent.innerHTML = 'Sorry, Data not found yet! Keep typing or check spelling.';
        }
    }




//clear form fields
/*function clearForm()
{
	var form = document.querySelectorAll(".formFields");
	for(i in form){
		form[i].value='';
	}
}*/
// reset form fields
    var clearForm = function () {
        contactName.value = '';
        contactPhone.value = '';
        contactEmail.value = '';
    }











