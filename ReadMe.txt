IT5007 Tutorial 2 - Ding Ming
Git repository: https://github.com/RayLate/bookingsystemlit

HTML Part
myapp.html => main HTML file responsible for the rendering of most components
The entire application is contained within a div component styled with class 'card'
the header section of the card contains the header of the application
the body section of the card contains two sub cards, 
one to display all the occupancy information of all the seats
another contains the main control console where users can book/modify/cancel/view bookings

To book a seat, switch to the Book tab in the main console, then give a valid name and a phone number.
The browser alert window will tell you if your booking is successful or failed
To modify a seat, switch to the Edit tab in the main console, then give a valid ticket ID, name, and phone number.
the backend will first check if the ticket id exists and is not booked, if found, then the ticket will be updated with the new inputs
alternatively, you can modify the ticket by clicking on any occupied seat on the left-hand side.
To cancel a ticket is similar to how to edit a ticket. go to the edit tab, give the necessary inputs. the ticket will be cancelled if the inputs are valid.
The browser alert window will tell you if your modification/cancellation is successful or failed
In the View tab, a list of all the bookings will be shown in a table. at one time, only 10 records will be shown. You can toggle around the pages at the bottom table.

JAVASCRIPT Part
database.js contains the Database Object. the array[Object] of size 25 contains seat object with 5 properties, id (string), reserved (boolean), name (string), number (string), timestamp (string).
during initialization, if seats are not found in localStorage, JS will save an empty copy to localStorage, otherwise, it loads the existing seats from localStorage
the database object has the following methods
getDatabase => return an array of seat objects
isFull => return true if all seats are booked is full
occupiedCount => return the count of a current occupied seat
getFirstEmptySeat => return the first empty seat object
saveDatabase => saves this.seats to localStorage
resetDatabase => cleans database
reservedSeat => takes in name, number and timestamp to reserve the first empty seat object
updateSeat => takes in id, name, number, timestamp to override the seat object with id = id
canceledBooking => cancel a booking using ticket id
searchResult => returns the searched object using id
checkReservation => takes in id, name and number to check a booking is valid


myapp.js contains the business logic behind the application
this script initializes a new Database object at the start
Functions
tabToggler => switch the HTML element rendered in the console when a tab is pressed
formValidation => check if the given args is a null or empty string
useTimestamp => return a string timestamp in mm-dd-yyyy hh:mm format
resetInput => resets all the <input> tags in the document
showOccupancy => renders all each seat object and give the reserved class to booked seats or remove the reserved class from available seats
onNewBooking => book a seat if the inputs are valid
seatOnClick => when a booked seat is clicked, the console toggles to the Edit tab and the inputs are populated with the booking details
onCancelBooking => cancel a booking if the given inputs are valid
onModifyBooking => modifies a booking entry if the given inputs are valid
showBookingList => renders the table body of the booking list
showPagination => renders the pagination numbers in the view tab, numbers are dynamically based on the current booked count
resetBookings => resets the database onclick

CSS Theme color
  --darkblue: #0c1440;
  --offblue: #3a5d8c;
  --green: #84bfaa;
  --light-green: #a4b9b2;
  --yellow: #f2be5c;
  --light-yellow: #e4c793;
  --red: #f27a5e;
  --light-red: #f3a998;