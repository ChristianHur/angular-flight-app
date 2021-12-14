import { Component, OnInit } from '@angular/core';
import { IFlightData } from 'src/app/services/flightdata.interface';
import { FlightdataService } from 'src/app/services/flightdata.service';
import { Util } from '../../util'; 

@Component({
  selector: 'app-addflight',
  templateUrl: './addflight.component.html',
  styles: []
})
export class AddflightComponent implements OnInit{

  // Inject Flightdata Service
  constructor(private flightService: FlightdataService) { }

  /**
   * Lifecycle hook
   */
  ngOnInit(): void {
    this.flightService.getAllFlights().subscribe(data => this.gFlightData=data);
  }
  
  error = false;  // Form control error flag
  submitted = false;  // Successful form submission flag
  
  gFlightData!: IFlightData; // = this.flightService.flightData; // Global flight data

  util = new Util();
  validReqs = this.util.validReqs;  // Validation requirements
  errMessages = this.util.errMessages; // Error messages

  // The new FlightData (default data)
  flightData = {
    id: 1,
    flight_no: "",
    airline: "",
    trip_type: "One Way",
    departure_airport: "",
    arrival_airport: "",
    departure_date: this.util.getTodayDate(),
    return_date: "",
  };

  /**
   * Check for field validity and assign is-invalid class to host element
   * @param field1 
   * @param field2 
   */
  isValid(field1, field2 = null) {
    return (
        this.validReqs[field1].error || this.validReqs[field2] 
        ? "form-control is-invalid" 
        : "form-control"
    )
  }

  /**
   * Handle keypress event
   * @param event 
   */
  handleChange(event) {
    this.error = false;
    this.submitted = false;
    let { name, value } = event.target;
    this.validReqs[name].error = false;

    // Remove idExists error message for id field
    if (name === 'id'){
      this.validReqs.idExists = null;
    }
    
    // Uppercase all airport names and remove sameAirportError message
    if (name === 'departure_airport' || name === 'arrival_airport'){
      this.validReqs.sameAirportError = null;
      value = value.toUpperCase();
    }

    // Remove datesError message
    if (name === 'departure_date' || name === 'return_date'){
      this.validReqs.datesError = null;
    }

    // Uppercase flight number
    if (name === 'flight_no'){
        value = value.toUpperCase();
    }

    // Capitalize first letter of each word of airline name
    if (name === 'airline'){
        value = value.replace(/(^\w|\s\w)/g, m => m.toUpperCase());
    }

    this.flightData[name] = value;
  }

   /**
   * Handle form submission
   * @param event 
   */
  handleSubmit(event) {
    event.preventDefault();

    // Trim whitespaces
    let keys = Object.keys(this.flightData);
    keys.forEach(key => {
      if (key === 'id')
        this.flightData[key] = this.flightData[key];
      else
        this.flightData[key] = this.flightData[key].trim();
    });

    this.validateForm();

    if (!this.error) {
      this.flightService.addFlight(this.flightData);
      this.submitted = true;
    } 
  }

  /**
   * Validate form control
   */
  validateForm() {
    this.error = false;
    let validObj = null;

    // Object of data required for validator function
    let obj = {
      data: this.flightData, 
      flightData:this.gFlightData, 
      validReqs:this.validReqs, 
      errMessages:this.errMessages, 
      error:this.error, 
      action:'add'
    }
    
    // Validate all requirements
    validObj = this.util.validateAll(obj)

    // Update the error flag and validReqs object        
    this.error = validObj.error;
    this.validReqs = validObj.validReqs;

    {
    //###### NOT NEEDED - USING UTIL FUNCTIONS ##########################
    // this.error = false;
    // let data = this.flightData;

    // // Extract the values for all id fields from full data set
    // let values = this.gFlightData.map(e => e.id);

    // // Check for unique id - if exists then try again
    // if (values.indexOf(data.id) !== -1) {
    //   this.validReqs.idExists = this.errMessages.idExists;
    //   this.error = true;
    // }

    // // Check if id is within number range
    // if (data.id < 1) {
    //   this.validReqs.id.error = this.errMessages.idError;
    //   this.error = true;
    // }

    // // Check if Flight No is within character range
    // if (data.flight_no.length < 5) {
    //   this.validReqs.flight_no.error = this.errMessages.flight_noError;
    //   this.error = true;
    // }

    // // Check if Airline is within character range
    // if (data.airline.length < 2) {
    //   this.validReqs.airline.error = this.errMessages.airlineError;
    //   this.error = true;
    // }

    // // Check if Departure Airport is within character range
    // if (data.departure_airport.length < 2) {
    //   this.validReqs.departure_airport.error = this.errMessages.departure_airportError;
    //   this.error = true;
    // }

    // // Check if Arrival Airport is within character range
    // if (data.arrival_airport.length < 2) {
    //   this.validReqs.arrival_airport.error = this.errMessages.arrival_airportError;
    //   this.error = true;
    // }

    // // Check if airports are same
    // if (data.departure_airport !== '' && data.departure_airport === data.arrival_airport) {
    //   this.validReqs.sameAirportError = this.errMessages.sameAirportError;
    //   this.error = true;
    // }

    // // Check if Departure Date is valid
    // if (data.departure_date.length === 0) {
    //   this.validReqs.departure_date.error = this.errMessages.departure_dateError;
    //   this.error = true;
    // }
    // // Check if Return Date is valid
    // if (data.return_date.length === 0) {
    //   this.validReqs.return_date.error = this.errMessages.return_dateError;
    //   this.error = true;
    // }

    // // Convert date strings to Date
    // // Check if Departure Date is after Return Date
    // if (new Date(data.departure_date) > new Date(data.return_date)) {
    //   this.validReqs.datesError = this.errMessages.datesError;
    //   this.error = true;
    // }
  }
  }

}
