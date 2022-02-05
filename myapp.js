// Init
var database = new Database();
console.log(database.getDatabase());

const tabToggler = (event, funcName) => {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");

  // hide all tabcontent
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].classList.remove("active");
  }
  document.getElementById(funcName).style.display = "block";
  if (event) {
    resetInput();
    event.currentTarget.classList.add("active");
  } else {
    console.log(document.getElementById("edit_tab"));
    document.getElementById("edit_tab").classList.add("active");
  }
};

const formValidation = (...args) => {
  if (args.some((a) => a === null || a.trim() === "")) {
    alert("Either input is invalid! Please try again");
    return false;
  }
  return true;
};

const useTimestamp = () => {
  const timestamp = new Date();
  return `${
    timestamp.getMonth() + 1
  }-${timestamp.getDate()}-${timestamp.getFullYear()} ${timestamp.getHours()}:${
    timestamp.getMinutes() < 10
      ? "0" + timestamp.getMinutes()
      : timestamp.getMinutes()
  }`;
};

const resetInput = () => {
  const inputElements = document.getElementsByTagName("input");
  Array.from(inputElements).forEach(
    (inputElement) => (inputElement.value = "")
  );
};

const showOccupancy = () => {
  document.getElementById("seatavailable").textContent =
    25 - database.occupiedCount();
  database.getDatabase().map((seat) => {
    if (seat.reserved) {
      document.getElementById(seat.id).classList.add("reserved");
    } else {
      document.getElementById(seat.id).classList.remove("reserved");
      document.getElementById(seat.id).disabled = true;
    }
  });
};

const onNewBooking = (event) => {
  var username, userphone, timestamp;
  username = document.getElementById("bfname");
  userphone = document.getElementById("bfhpnumber");
  if (formValidation(username.value, userphone.value)) {
    username.value = username.value.trim();
    if (!database.isFull()) {
      timestamp = useTimestamp();
      bookedseat = database.reservedSeat(
        username.value,
        userphone.value,
        timestamp
      );
      const resultmessage = document.createElement("small");
      resultmessage.appendChild(
        document.createTextNode("Booking Successfully!")
      );
      resultmessage.style.color = "green";
      document.getElementById("bookingresulttext").appendChild(resultmessage);

      window.setTimeout(
        () => (document.getElementById("bookingresulttext").innerHTML = ""),
        2000
      );
      window.alert(
        `Booking Successfully\nBookID:    ${bookedseat.id}\nName:      ${bookedseat.name}\nPhone:     ${bookedseat.number}\nTime:       ${bookedseat.timestamp}`
      );
      showOccupancy();
      username.value = "";
      userphone.value = "";
    } else {
      window.alert("All Seats are reserved");
    }
  } else {
    window.alert("Booking failed, please check your input");
  }
};

const seatOnClick = (event) => {
  if (event.target.classList.contains("reserved")) {
    var seat = database.searchResult(event.target.id);
    console.log(seat);
    console.log(event.target.id);
    document.getElementById("cfid").value = seat.id;
    document.getElementById("cfname").value = seat.name;
    document.getElementById("cfhpnumber").value = seat.number;
    tabToggler(null, "Edit");
  }
};

const onCancelBooking = () => {
  bookingid = document.getElementById("cfid");
  username = document.getElementById("cfname");
  userphone = document.getElementById("cfhpnumber");

  if (
    formValidation(bookingid.value, username.value, userphone.value) &&
    database.checkReservation(bookingid.value, username.value, userphone.value)
  ) {
    database.canceledBooking(bookingid.value);
    window.alert(`Booking Cancel Successfully\nBookID:    ${bookingid.value}`);
    bookingid.value = "";
    username.value = "";
    userphone.value = "";
    showOccupancy();
  } else {
    window.alert("Invalid booking entry");
  }
};

const onModifyBooking = () => {
  bookingid = document.getElementById("cfid");
  username = document.getElementById("cfname");
  userphone = document.getElementById("cfhpnumber");
  if (formValidation(bookingid.value, username.value, userphone.value)) {
    // Try ES6 Promise Object
    new Promise((resolve, reject) => {
      updatedSeat = database.updateSeat(
        bookingid.value,
        username.value,
        userphone.value,
        useTimestamp()
      );
      if (updatedSeat) {
        resolve(updatedSeat);
      } else {
        reject(new Error("Invalid entry"));
      }
    })
      .then((updatedSeat) => {
        window.alert(
          `Booking Modifed Successfully\n
        BookID:    ${updatedSeat.id}\n
        Updated name: ${updatedSeat.name}\n
        Updated number: ${updatedSeat.number}\n
        On: ${updatedSeat.timestamp}
        `
        );
      })
      .catch((err) => {
        alert(err.message);
      });
  }
};

const showBookingList = (event) => {
  const renderLocation = document.getElementById("bookingList");
  const bookingList = database
    .getDatabase()
    .filter((booking) => booking.reserved);
  var page = [0, 10];
  if (event) {
    var i = parseInt(event.target.innerHTML) - 1;
    page = [0 + 10 * i, 10 + 10 * i];
  }
  renderLocation.innerHTML = bookingList
    .map(
      (booking) => `<tr>
    <td>${booking.id.toUpperCase()}</td>
      <td>${booking.name.toUpperCase()}</td>
      <td>${booking.number}</td>
      <td>${booking.timestamp}</td>
      </tr>    `
    )
    .slice(...page)
    .join("");
};

const showPagination = () => {
  const bookingList = database
    .getDatabase()
    .filter((booking) => booking.reserved);
  var paginationList = [];
  var entryCount = bookingList.length;
  for (let i = 0; i < Math.ceil(entryCount / 10); i++) {
    var sliceRange = [0 + 10 * i, 10 + 10 * i];
    paginationList.push(sliceRange);
  }
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = paginationList
    .map(
      (page, index) => `<a onclick="showBookingList(event)">${index + 1}</a>`
    )
    .join("");
};

const resetBookings = () => database.resetDatabase();
