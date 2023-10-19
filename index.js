var input = document.querySelector(".container");

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function (event) {
  // If the user presses the "Enter" key on the keyboard
  if (event.key === "Enter") {
    // Cancel the default action, if needed
    event.preventDefault();
    // Trigger the button element with a click
    document.getElementById("Submit").click();
  }
});

function getDataFromUser() {
  var name = document.getElementById("name").value;
  var designation = document.getElementById("designation").value;
  var number = document.getElementById("phoneNumber").value;
  var email = document.getElementById("email").value;

  console.log(number);

  // Create an object to store the form data
  var formData = {
    name: name,
    designation: designation,
    phoneNumber: number,
    email: email,
  };

  return formData;
}

function getDataFromLocalStorage() {
  var peopleList;
  if (localStorage.getItem("peopleList") == null) {
    peopleList = [];
  } else {
    peopleList = JSON.parse(localStorage.getItem("peopleList"));
  }
  return peopleList;
}

function validateForm() {
  var data = getDataFromUser();
  console.log(data);

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const numberPattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;

  if (data.name == "") {
    alert("Name is required");
    return false;
  }

  if (data.phoneNumber == "") {
    alert("Number is required");
    return false;
  } else if (!numberPattern.test(data.phoneNumber)) {
    alert("invalid Phone number");
    return false;
  }

  if (data.designation == "") {
    alert("designation is required");
    return false;
  }

  if (data.email == "") {
    alert("email is required");
    return false;
  } else if (!emailPattern.test(data.email)) {
    alert("Invalid email Address");
    return false;
  }

  return true;
}

function AddData() {
  if (validateForm()) {
    var data = getDataFromUser();
    var peopleList = getDataFromLocalStorage();

    peopleList.push(data);

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    setEmpty();
  }
}

// loads data when page reloads;
document.onload = showData();

function setEmpty() {
  document.getElementById("name").value = "";
  document.getElementById("designation").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("email").value = "";
}

// function to delete Data from the localStorage

function deleteData(index) {
  var peopleList = getDataFromLocalStorage();
  peopleList.splice(index, 1);
  console.log(peopleList);
  localStorage.setItem("peopleList", JSON.stringify(peopleList));
  showData();
}

function updateData(index) {
  document.getElementById("Submit").style.display = "none";
  document.getElementById("Update").style.display = "block";
  var peopleList = getDataFromLocalStorage();

  document.getElementById("name").value = peopleList[index].name;
  document.getElementById("designation").value = peopleList[index].designation;
  document.getElementById("phoneNumber").value = peopleList[index].phoneNumber;
  document.getElementById("email").value = peopleList[index].email;

  document.querySelector("#Update").onclick = function () {
    if (validateForm()) {
      var data = getDataFromUser();
      peopleList[index].name = data.name;
      peopleList[index].designation = data.designation;
      peopleList[index].phoneNumber = data.phoneNumber;
      peopleList[index].email = data.email;

      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();

      document.getElementById("Submit").style.display = "block";
      document.getElementById("Update").style.display = "none";
    }
  };
}

function showData() {
  var peopleList = getDataFromLocalStorage();
  var html = "";
  document.querySelector("#crudTable tbody").innerHTML = "";
  peopleList.forEach(function (element, index) {
    html += `<tr>
                    <td>${element.name}</td>
                    <td>${element.email}</td>
                    <td>${element.designation}</td>
                    <td>${element.phoneNumber}</td>
                    <td>
                        <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
                        <button onclick="updateData(${index})" class="btn btn-warning m-2 w-5" id="editBtn">Edit</button> 
                    </td>
                </tr>`;
    document.querySelector("#crudTable tbody").innerHTML = html;
  });
}
