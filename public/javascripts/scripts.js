document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-book");
  const listButton = document.getElementById("list-books");
  const removeButton = document.getElementById("remove-book");
  const message = document.getElementById("status-message");
  const authorInput = document.getElementById("author");
  const titleInput = document.getElementById("title");
  const submitButton = document.getElementById("submit");

  alert("kkk");
  addButton.addEventListener("click", () => {
    setFormMode("add");
  });

  listButton.addEventListener("click", () => {
    setFormMode("list");
  });

  removeButton.addEventListener("click", () => {
    setFormMode("remove");
  });

  function setFormMode(mode) {
    switch (mode) {
      case "add":
        message.textContent = "Add a new book:";
        authorInput.style.display = "block";
        titleInput.style.display = "block";
        submitButton.textContent = "Add Book";
        submitButton.onclick = () => {
          // Your add book logic here
          console.log("Adding book:", authorInput.value, titleInput.value);
        };
        break;
      case "list":
        message.textContent = "Listing all books:";
        authorInput.style.display = "none";
        titleInput.style.display = "none";
        submitButton.textContent = "List Books";
        submitButton.onclick = () => {
          // Your list books logic here
          console.log("Listing books");
        };
        break;
      case "remove":
        message.textContent = "Remove a book:";
        authorInput.style.display = "block";
        titleInput.style.display = "block";
        submitButton.textContent = "Remove Book";
        submitButton.onclick = () => {
          // Your remove book logic here
          console.log("Removing book:", authorInput.value, titleInput.value);
        };
        break;
      default:
        break;
    }
  }

  // Initialize the form in add mode
  //   setFormMode("add");
});
