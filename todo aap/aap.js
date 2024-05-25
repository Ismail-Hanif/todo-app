
  var firebaseConfig = {
    apiKey: "AIzaSyAAivj-Ft0-yHc0U_fTNzcEnXcJ8p1IQdo",
    authDomain: "database-77b4c.firebaseapp.com",
    databaseURL: "https://database-77b4c-default-rtdb.firebaseio.com",
    projectId: "database-77b4c",
    storageBucket: "database-77b4c.appspot.com",
    messagingSenderId: "391499240396",
    appId: "1:391499240396:web:b9f57fbbfc73d6b24a4369",
    measurementId: "G-2C8LK8M8GH"
  };

  // Initialize Firebase
  var app = firebase.initializeApp(firebaseConfig);
  var db=firebase.database()
  console.log(db)

  
  var list = document.getElementById("list");
  
  firebase
    .database()
    .ref("todos")
    .on("child_added", function (data) {
      var liElement = document.createElement("li");
  
      var liText = document.createTextNode(data.val().todoVal);
  
      liElement.appendChild(liText);
  
      list.appendChild(liElement);
  
      var EditBtnELement = document.createElement("button");
  
      var EditBtnText = document.createTextNode("Edit");
  
      EditBtnELement.appendChild(EditBtnText);
  
      var DeleteBtnELement = document.createElement("button");
  
      var DeleteBtnText = document.createTextNode("Delete");
  
      DeleteBtnELement.appendChild(DeleteBtnText);
  
      liElement.appendChild(EditBtnELement);
  
      liElement.appendChild(DeleteBtnELement);
  
      EditBtnELement.setAttribute("class", "Editbtn");
      DeleteBtnELement.style.backgroundColor = "lightcoral";
  
      DeleteBtnELement.setAttribute("onclick", "deleteItem(this)");
  
      DeleteBtnELement.setAttribute("id", data.val().key);
  
      EditBtnELement.setAttribute("onclick", "EditItem(this)");
  
      EditBtnELement.setAttribute("id", data.val().key);
    });
  
  function addTodo() {
    var input = document.getElementById("todoInput");
  
    var id = Date.now().toString(25);
  
    var todoObj = {
      todoVal: input.value,
      key: id,
    };
  
    firebase
      .database()
      .ref("todos/" + id)
      .set(todoObj);
  }
  
  function deleteAll() {
    firebase.database().ref("todos").remove();
    list.innerHTML = "";
  }
  
  function deleteItem(e) {
    firebase.database().ref(`todos/${e.id}`).remove();
    e.parentNode.remove();
  }
  
  function EditItem(e) {
    var updateValue = prompt(
      "Enter updated value",
      e.parentNode.firstChild.nodeValue
    );
  
    firebase.database().ref(`todos/${e.id}`).set({
      key: e.id,
      todoVal: updateValue,
    });
  
    e.parentNode.firstChild.nodeValue = updateValue;
  }