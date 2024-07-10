// const { response } = require("express");
// Get elements from browser documents
document.addEventListener("DOMContentLoaded", () => {
  const addButton = document.getElementById("add-book");
  const listButton = document.getElementById("list-books");
  const removeButton = document.getElementById("remove-book");
  const searchButton = document.getElementById("search-book");
  const message = document.getElementById("status-message");
  const authorInput = document.getElementById("author");
  const titleInput = document.getElementById("title");
  const submitButton = document.getElementById("submit");
  const mainBody = document.querySelector("body");

  // Add event listeners to elements
  addButton.addEventListener("click", () => {
    setFormMode("add");
  });
  searchButton.addEventListener("click", () => {
    setFormMode("search");
  });
  listButton.addEventListener("click", () => {
    setFormMode("list");
  });

  removeButton.addEventListener("click", () => {
    setFormMode("remove");
  });
  function successMessage() {
    // Alerts user of succesful operation by changing background color and status message
    const orignalMessage = message.textContent;
    const originalBackgroundColour = mainBody.style.backgroundColor;
    message.textContent = "Success";
    mainBody.style.backgroundColor = "lightgreen";
    // Change back to original color and message after 1 second
    setTimeout(() => {
      mainBody.style.backgroundColor = originalBackgroundColour;
      message.textContent = orignalMessage;
    }, 1000);
  }
  function failureMessage() {
    // Alerts user of failed operation by changing background color and status message
    const orignalMessage = message.textContent;
    const originalBackgroundColour = mainBody.style.backgroundColor;
    message.textContent = "Action did not complete";
    mainBody.style.backgroundColor = "red";
    // Change back to original color and message after 1 second
    setTimeout(() => {
      mainBody.style.backgroundColor = originalBackgroundColour;
      message.textContent = orignalMessage;
    }, 1000);
  }
  function setFormMode(mode) {
    switch (mode) {
      case "add":
        message.textContent = "Add a new book:";
        authorInput.style.display = "block";
        titleInput.style.display = "block";
        submitButton.textContent = "Add Book";
        submitButton.onclick = () => {
          const author = authorInput.value;
          const title = titleInput.value;
          // check if author and title fields are not blank
          if (author === "" || title === "") {
            alert("Please enter both author and title.");
            return;
          }
          const book = { author, title }; // create book object from DOM element
          // send a fetch request to /add route in index.js
          fetch("/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book), // turn book object into json format
          })
            // convert the response from /add route to text
            .then((response) => response.text()) // parse response
            // Log the result to console and display it in an alert box; the response is passed as a data parameter

            .then((data) => {
              console.log(data);
              successMessage();
            })
            // handle errors in the fetch request
            .catch((error) => {
              console.error("error", error);
              failureMessage();
            });
        };
        break;

      case "remove":
        message.textContent = "Remove a book:";
        authorInput.style.display = "block";
        titleInput.style.display = "block";
        submitButton.textContent = "Remove Book";
        submitButton.onclick = () => {
          const author = authorInput.value;
          const title = titleInput.value;

          // check if author and title fields are not blank
          if (author === "" || title === "") {
            alert("Please enter both author and title.");
            return;
          }
          const book = { author, title }; // create book object from DOM element
          fetch("/delete", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(book),
          })
            .then((response) => response.text())
            .then((data) => {
              console.log(data);
              successMessage();
            })
            .catch((error) => {
              console.error("error", error);
              failureMessage();
            });

          // alert(
          //   `Removing book: Author :${authorInput.value} Title: ${titleInput.value}`
          // );
        };
        break;
      case "search":
        message.textContent = "Search for books:";
        authorInput.style.display = "block";
        titleInput.style.display = "hide";
        submitButton.textContent = "Search";
        submitButton.onclick = () => {
          const author = authorInput.value.toLowerCase();
          const title = titleInput.value.toLowerCase();
          //Check to make both author and title are not empty.
          if (author === "" && title === "") {
            alert("Please enter either author or title.");
            return;
          }
          // initialise list for story query string
          const query = [];
          if (author) query.push(`author=${encodeURIComponent(author)}`); // if author exists add to query list
          if (title) query.push(`title=${encodeURIComponent(title)}`); // if title exists add to query list
          const queryString = query.join("&"); //join title and author together with an ampersand for correct query formatting
          window.location.href = `/search?${queryString}`;
        };
        break;
      default:
        break;
    }
  }
});
