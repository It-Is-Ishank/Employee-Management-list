function getDataFromUser() {
  var name = document.getElementById("name").value;
  var eid = document.getElementById("eid").value;
  var designation = document.getElementById("designation").value;
  var number = document.getElementById("phoneNumber").value;
  var email = document.getElementById("email").value;

  // Create an object to store the form data
  var formData = {
    name: name,
    eid: eid,
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

  const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const numberPattern =
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const eidPattern = /^\d{1,}/;

  if (data.name.trim() == "") {
    alert("Name is required");
    return false;
  }
  if (data.eid.trim() == "") {
    alert("Employee ID is required");
    return false;
  }

  if (data.phoneNumber.trim() == "") {
    alert("Number is required");
    return false;
  } else if (!numberPattern.test(data.phoneNumber.trim())) {
    alert("invalid Phone number");
    return false;
  }

  if (data.designation.trim() == "") {
    alert("designation is required");
    return false;
  }

  if (data.email.trim() == "") {
    alert("email is required");
    return false;
  } else if (!emailPattern.test(data.email.trim())) {
    alert("Invalid email Address");
    return false;
  }

  return true;
}

function AddData() {
  if (validateForm()) {
    var data = getDataFromUser();
    var peopleList = getDataFromLocalStorage();

    // Check if an employee with the same eid already exists
    if (employeeExists(data.eid, peopleList)) {
      alert("Employee with the same Employee ID already exists.");
      return; // Do not add the duplicate employee
    }

    peopleList.push(data);

    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
    setEmpty();
  }
}

// Function to check if an employee with the same eid already exists
function employeeExists(eid, peopleList) {
  return peopleList.some(function (employee) {
    return employee.eid === eid;
  });
}

// loads data when page reloads;
document.onload = showData();

function setEmpty() {
  document.getElementById("name").value = "";
  document.getElementById("eid").value = "";
  document.getElementById("designation").value = "";
  document.getElementById("phoneNumber").value = "";
  document.getElementById("email").value = "";
}

// function to delete Data from the localStorage

function deleteData(index) {
  var peopleList = getDataFromLocalStorage();
  peopleList.splice(index, 1);
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
  document.getElementById("eid").value = peopleList[index].eid;

  document.querySelector("#Update").onclick = function () {
    if (validateForm()) {
      var data = getDataFromUser();
      peopleList[index].name = data.name;
      peopleList[index].designation = data.designation;
      peopleList[index].phoneNumber = data.phoneNumber;
      peopleList[index].email = data.email;
      peopleList[index].eid = data.eid;

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
                    <td>${element.eid}</td>
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
