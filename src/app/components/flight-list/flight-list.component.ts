import { Component, OnInit } from '@angular/core';
import { FlightdataService } from 'src/app/services/flightdata.service';
import { IFlightData } from '../../services/flightdata.interface';


@Component({
  selector: 'app-flight-list',
  templateUrl: './flight-list.component.html',
  styles: []
})
export class FlightListComponent implements OnInit {

  // Inject Flightdata Service
  constructor(private flightService: FlightdataService) { }

  flights!: IFlightData; // The list of flights
  show = true;  // show/hide table

  // Count number of items in the list
  //count = this.flightService.flightData.length;
  count = 0;

  /**
   * Toggle show/hide table
   * @param active - boolean true/fasle
   */
  isActive(active: boolean) {
    this.show = active;
  }

  /**
   * Lifecycle method
   */
  ngOnInit(): void {
    this.reloadData();
  }

  /**
   * Function to reload data from remote server and update count
   */
  reloadData(): void {
    this.flightService.getAllFlights().subscribe(data => {
      this.flights = data;
      this.count = data.length;
    });
  }

  /**
   * Delete a single flight
   * @param id - the id of a record
   */
  deleteFlight(id) {
    this.flightService.deleteFlight(parseInt(id)).subscribe(data => {
      console.log(data);

      // Update count
      //this.count = this.flightService.flightData.length;
      this.reloadData();
    });

  }

  /**
   * Delete all flights
   */
  deleteAll() {
    this.flightService.deleteAll().subscribe(data => {
      console.log(data);
      // Update count
      //this.count = this.flightService.flightData.length;  
      // Reset the flightData
      this.reloadData();
    });

  }
}
