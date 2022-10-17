// First display the data dynamically in order to do that
// get the element that is responsbile to display the data

// create a display function that displays the data
// pass the HTML element as a template literal

// this has created the blueprint to display our data now lets work on fetching the api
// in order to fetch the api we use fetch() function

displayElm = document.getElementById("displayField");
displayCount = document.getElementById("userCount");
displayMale = document.getElementById("maleUsers");

const api = "https://randomuser.me/api/?results=10&";

// declaring an array to store the user array from the api

let userArray = [];

// create a function called fetchapi then pass the api url to the fetch which is a web api function which then returns the response which is then converted into json format
const fetchApi = (updatedApiQuery) => {
  fetch(api + updatedApiQuery)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

      //   why can't we send the data.results directly as the parameter
      userArray = data.results;
      displayUsers(userArray);
      //   call the display function once the data has been recieved
      //   send the data in an array as a parameter to the function
    })
    // error catching done . without this the whole webiste would crash.
    .catch((error) => {
      console.log(error);
    });
};

fetchApi();
const displayUsers = (users) => {
  // in order to  get all the data dynamically from the api we need to loop through the results and display them dynamically

  let str = "";

  users.map((item, index) => {
    str += `  <div class="card" style="width: 18rem">
    <img
      src="${item.picture.large}"
      class="card-img-top"
      alt="..."
    />
    <div class="card-body">
      <h5 class="card-title">${item.name.title} ${item.name.first} ${item.name.last}</h5>
        

<ul class="list-unstyled">
<li><i class="fa-solid fa-envelope"></i>${item.email}</li>
<li><i class="fa-sharp fa-solid fa-map"></i>${item.location.city}</li>
<li></li>
<li></li>
</ul>
    </div>
  </div>`;
  });

  displayElm.innerHTML = str;
  displayCount.innerText = users.length;
};

// Handle the input from the users

// This function captures event as its parameter
const handleTextFromUser = (e) => {
  // converting the text into string
  let textFromUser = e.value;
  console.log(textFromUser);

  //   now we need to filter the array
  //   filter array operates on the original array then returns a new one
  const onSearchFilteredArray = userArray.filter((textuser, index) => {
    // creating a variable and storing the name of the user from the array
    const name = textuser.name.first + textuser.name.last;
    // console.log(name);

    // returning the name if it is included in the array
    return name.toLowerCase().includes(textFromUser.toLowerCase());
  });
  console.log(userArray);
  displayUsers(onSearchFilteredArray);
  console.log(onSearchFilteredArray);
};

const handleGenderSelect = (e) => {
  const userSex = e.value;
  console.log(userSex);
  //   we created a variable that store the new api endpoint that need to be passed
  const updatedApiQuery = "gender=" + userSex;
  fetchApi(updatedApiQuery);
  displayMale.innerText = userSex.charAt(0).toUpperCase() + userSex.slice(1);
};
// displayUsers();
