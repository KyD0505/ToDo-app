let uName = [];
let uPass = [];
// stored "input-box" id from html to JavaScript variable "inputBox"
const inputBox = document.getElementById("input-box");
// stored "list-container" id from html to JavaScript variable "listContainer"
const listContainer = document.getElementById("list-container");

// defines what would happen when this function is called or triggered
function addTask(){
    if (inputBox.value === '') {
        alert("Please input a task first!");
    } else {
        // the "li" js variable creates a "<li>" tag
        let li = document.createElement("li");
        // the li.innerHTML refers to the value inside the "<li>" tag that will be created, 
        // since "inputBox" js variable is equivalent to the "input-box" id in html,
        // it means that the "<li>" html tag that will be created is gonna contain the value of the html id "input-box"
        // (NOTE: innerHTML means calling/manipulating an html string(value of "li" tag) in javascript raw without using variables (at least that's how I interpret it))
        //(PS. new interpretation to innerHTML, it just means being allowed to do CRUD to the string inside the HTML element that is selected, meaning in this app, li.innerHTML is the string between <li> and </li>)
        li.innerHTML = inputBox.value;
        // no idea about appendChild syntax but this line of code allows js to display "li" js variable's value into the "list-container" html (the "ul" tag)
        listContainer.appendChild(li);

        // noticed that after a "createElement", it is followed by an "innerHTML", meaning that you are creating an html tag and defining its value using javascript
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; // or "×";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

// ******OBSERVATIONS*******
// Line 30 creates an "event listener" that observes or "listens" to an event, in this case it listens to "click" which is a boolean value whether an object is clicked or not clicked

// "click": This specifies the type of event to listen for. In this case, it's a click event, meaning the code inside the function will be executed when the listContainer is clicked.

// function(e): This is the event handler function. It defines what should happen when the specified event occurs. The (e) parameter is an event object that contains information about the event, such as the target element, mouse coordinates, etc.

listContainer.addEventListener("click", function(e){
    //'e' contains the value of the event

    //The ".target" property in the context of an event refers to the HTML element that triggered the event. (in simple terms in our app, what HTML element is "clicked")
    
    //tagName refers to the string value of <li>

    //The ".classList.toggle" method is used to toggle the presence of a class in the class list of an HTML element.

    if (e.target.tagName === "LI") {
        // e.target means <li> 

        //Line 47 targets and inputs a "checked" string into <li>'s class name
        e.target.classList.toggle("checked");
        saveData();

    } else if (e.target.tagName === "SPAN") {

        //e.target: This refers to the element that triggered the event. In the context of an event handler, e.target represents the specific element on which the event occurred. For example, if you click a button, e.target would be the button.

        //.parentElement: This property of the DOM Element interface returns the parent element of the specified element. In other words, it retrieves the immediate container or wrapper of the element.

        //.remove(): This method is used to remove the element from the DOM. When called on an element, it removes that element and its content from the document.

        //Putting it all together, e.target.parentElement.remove(); means:

        //1. Identify the element that triggered the event (e.target).
        //2. Access its parent element (e.target.parentElement).
        //3. Remove the parent element and its content from the DOM (e.target.parentElement.remove()).

        // (in simple terms, clicking the span will remove its parent HTML element and its value, which is <li> because span is inside of the HTML tag <li>)
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function createAccount() {
    let createUsername = document.getElementById("createUsername").value;
    let createPassword = document.getElementById("createPassword").value;
    
    // Simple validation (you may want to enhance this)
    if (createUsername === "" || createPassword === "") {
        alert("Please enter both username and password");
        return;
    }

    // Retrieve existing user accounts from localStorage
    uName = JSON.parse(localStorage.getItem("uName")) || [];
    uPass = JSON.parse(localStorage.getItem("uPass")) || [];

    // Check if the username already exists
    if (uName.includes(createUsername)) {
        alert("Username already exists. Please choose another username.");
        return;
    }

    // Add the new account to the arrays
    uName.push(createUsername);
    uPass.push(createPassword);

    // Store the updated user accounts in localStorage
    localStorage.setItem("uName", JSON.stringify(uName));
    localStorage.setItem("uPass", JSON.stringify(uPass));

    // Optionally, you can clear the input fields after creating an account
    document.getElementById("createUsername").value = "";
    document.getElementById("createPassword").value = "";

    console.log("Stored usernames:", uName);
    console.log("Stored passwords:", uPass);

    alert("Account created successfully!");
    logout()
}
function submitForm() {
    var username = document.getElementById("loginUsername").value;
    var password = document.getElementById("loginPassword").value;

    // Simple validation (you may want to enhance this)
    if (username === "" || password === "") {
        alert("Please enter both username and password");
        return;
    }

    // Retrieve user accounts from localStorage
    uName = JSON.parse(localStorage.getItem("uName")) || [];
    uPass = JSON.parse(localStorage.getItem("uPass")) || [];

    console.log("Stored usernames:", uName);
    console.log("Stored passwords:", uPass);

    // For simplicity, let's just show an alert indicating successful login
    // alert("Login successful! Welcome <33, " + username);

    // Simulate a successful login
    // Find the index of the username in the uName array
    const index = uName.findIndex((storedUsername) => storedUsername.toLowerCase() === username.toLowerCase());

    console.log("Entered username:", username);
    console.log("Index found:", index);

    // Check if the username is found and the password matches
    if (index !== -1 && uPass[index] === password) {
        // Successful login
        alert("Login successful! Welcome <33, " + username);
        // Redirect to another web page (change "dashboard.html" to the desired page)
        window.location.href = "Kyle-To-Do.html";
    } else {
        // Failed login
        alert("Login failed. Please check your credentials.");
    }

    // Optionally, you can clear the input fields after login attempt
    document.getElementById("loginUsername").value = "";
    document.getElementById("loginPassword").value = "";

    // var isLoggedIn = true;

    // if (isLoggedIn) {
    //     // Redirect to another web page (change "dashboard.html" to the desired page)
    //     alert("Login successful! Welcome <33, " + username);
    //     window.location.href = "Kyle-To-Do.html";
    // } else {
    //     alert("Login failed. Please check your credentials.");
    // }
    // username = "";
    // password = "";
}
function logout() {
    window.location.href = "login.html";
}

//saving the strings/values of the "listContaner"(<ul>) in browser as named "data"
//now we call this saveData function in every function we do
function saveData(){
    localStorage.setItem("data", listContainer.innerHTML);
}
// retreiving the strings/values named "data"
function showData(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showData();