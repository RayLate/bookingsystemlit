// Init
class Database {
  /**
   * @param {Object[]} seats
   */
  constructor() {
    console.log("Database constructor");
    if (window.localStorage.getItem("seats") == null) {
      // init database for the first time
      var seats = [];
      for (var i = 0; i < 25; i++) {
        seats[i] = {
          id: `id_${i + 1}`,
          reserved: false,
          name: "",
          number: "",
          timestamp: "",
        };
      }
      window.localStorage.setItem("seats", JSON.stringify(seats));
    }
    this.seats = JSON.parse(window.localStorage.getItem("seats"));
    this.empty = { reserved: false, name: "", number: "", timestamp: "" };
  }

  getDatabase() {
    return this.seats;
  }
  isFull() {
    if (this.seats.some((seat) => !seat.reserved)) return false;
    return true;
  }

  getFirstEmptySeat() {
    if (!this.isFull()) return this.seats.find((seat) => !seat.reserved);
    return null;
  }

  saveDatabase(seats) {
    window.localStorage.setItem("seats", JSON.stringify(seats));
  }

  occupiedCount() {
    return this.seats.filter((seat) => seat.reserved).length;
  }

  resetDatabase() {
    var seats = [];
    for (var i = 0; i < 25; i++) {
      seats[i] = {
        id: `id_${i + 1}`,
        reserved: false,
        name: "",
        number: "",
        timestamp: "",
      };
    }
    this.seats = seats;
    this.saveDatabase(seats);
  }

  /**
   * @param {number} id
   * @param {string} name
   * @param {string} number
   * @param {string} timestamp
   */
  reservedSeat(name, number, timestamp) {
    var seat = this.getFirstEmptySeat();
    var index = parseInt(seat.id.replace("id_", "")) - 1;
    if (seat) {
      this.seats[index] = {
        ...this.seats[index],
        reserved: true,
        name: name,
        number: number,
        timestamp: timestamp,
      };
      window.localStorage.setItem("seats", JSON.stringify(this.seats));
      return this.seats[index];
    } else {
      return null;
    }
  }

  updateSeat(id, name, number, timestamp) {
    if (!this.searchResult(id)) return null;
    var index = parseInt(id.replace("id_", "")) - 1;
    if (this.seats[index].reserved === false) return null;

    this.seats[index] = {
      ...this.seats[index],
      name: name,
      number: number,
      timestamp: timestamp,
    };
    this.saveDatabase(this.seats);
    return this.seats[index];
  }

  /**
   * @param {number} id
   */
  canceledBooking(id) {
    var index = parseInt(id.replace("id_", "")) - 1;
    this.seats[index] = { ...this.seats[index], ...this.empty };
    this.saveDatabase(this.seats);
  }
  /**
   * @param {number} id
   * @param {string} number
   */
  searchResult(id) {
    return this.seats.find((seat) => seat.id === id);
  }

  checkReservation(id, name, number) {
    var searchedSeat = this.searchResult(id);
    if (
      searchedSeat &&
      searchedSeat.name === name &&
      searchedSeat.number === number
    ) {
      return true;
    }
    return false;
  }
}
