import { Component } from '@angular/core';

@Component({
  selector: 'app-seat-reservation',
  templateUrl: './seat-reservation.component.html',
  styleUrls: ['./seat-reservation.component.css']
})
export class SeatReservationComponent {
  seats: { id: number, status: string }[] = Array(80).fill(null).map((_, i) => ({
    id: i + 1,
    status: 'Available'
  }));
  requestedSeats: number = 1; // To capture the input number of seats
  bookedSeats: number[] = [2, 5, 10, 11, 13, 14, 37, 38, 48, 60, 71]; // Example of some seats already booked
  Booked: number[] = [];  // To track booked seats for each user

  constructor() {
    // Mark the pre-Booked seats
    this.bookedSeats.forEach(seatId => {
      this.seats[seatId - 1].status = 'Booked';
    });
  }

  // main logic for booking seats
  bookSeats(requestedSeats: number) {
    // Input validation: check if requestedSeats is between 1 and 7
    if (this.requestedSeats > 7) {
      alert('You are not allowed to book more than 7 seats at a time!');
      console.log('Error: Invalid Input!');
      return; 
    }
    else if(this.requestedSeats < 1){
      alert('Please enter valid number between (1-7).');
      console.log('Error: Invalid Input!');
      return;
    }

    // Check if the coach is full
    if (this.seats.every(seat => seat.status === 'Booked')) {
      alert('The entire coach is full! No seats available for booking!');
      return; 
    }

    let Booked: any[] = [];
    
    // Try to book all seats in one row (11 rows with 7 seats, last row has 3)
    for (let i = 0; i < 12; i++) { 
      let rowSeats = this.seats.slice(i * 7, i * 7 + (i === 11 ? 3 : 7));
      let availableSeats = rowSeats.filter(seat => seat.status === 'Available');

      // Check if we can book all requested seats in this row
      if (availableSeats.length >= requestedSeats) {
        Booked = availableSeats.slice(0, requestedSeats).map(seat => seat.id);
        break;
      }
    }

    // If not enough seats found in one row, book nearby Available seats across rows
    if (Booked.length === 0) {
      let availableSeats = this.seats.filter(seat => seat.status === 'Available');
      if (availableSeats.length >= requestedSeats) {
        Booked = availableSeats.slice(0, requestedSeats).map(seat => seat.id);
      }
    }

    // Mark the Booked seats as 'Booked'
    if (Booked.length > 0) {
      Booked.forEach(seatId => {
        this.seats[seatId - 1].status = 'Booked';
      });
      this.Booked = Booked; // Store the booked seats for displaying to the user
    } else {
      // Show alert if not enough seats are available
      alert('Not enough seats available! Please try a lower number.');
      console.log('Not Enough Seats Available');
    }
  }
}
