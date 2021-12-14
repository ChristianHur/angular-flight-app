import { Component, OnInit } from '@angular/core';
import { FlightdataService } from 'src/app/services/flightdata.service';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Util } from '../../util';
import { IFlightData } from '../../services/flightdata.interface';

@Component({
  selector: 'app-editflight',
  templateUrl: './editflight.component.html',
  styles: []
})
export class EditflightComponent implements OnInit {

  error = false;      // Form control error flag
  submitted = false;  // Successful form submission flag
  id = null;          // The flight_id of record to edit

  // gFlightData = this.flightService.flightData;  // flight data service
  gFlightData: IFlightData;
  flightData: IFlightData;                      // The new FlightData
  form: FormGroup;                              // FormGroup name

  util = new Util();
  validReqs = this.util.validReqs;     // Validation requirements
  errMessages = this.util.errMessages; // Error messages

  // Inject Flightdata Service and ActivatedRoute
  constructor(private flightService: FlightdataService, private route: ActivatedRoute) { }

  /**
   * Lifecycle hook
   */
  ngOnInit(): void {
    // Get the ID from URL parameter using snapshot
    //this.id = parseInt(this.route.snapshot.paramMap.get('id'));

    // Get the index from the flight data service
    //let index = this.gFlightData.findIndex( e => e.id === parseInt(this.id));

    // Clone the object to block direct reference to flight service
    //this.flightData = Object.assign({},this.gFlightData[index]);
    this.route.paramMap.subscribe(params => this.id = params.get('id'));
    this.flightService.getFlight(this.id).subscribe(data => {
      this.flightData = data;
      this.form.reset({
        id: this.flightData.id,
        flight_no: this.flightData.flight_no,
        airline: this.flightData.airline,
        trip_type: this.flightData.trip_type,
        departure_airport: this.flightData.departure_airport,
        arrival_airport: this.flightData.arrival_airport,
        departure_date: this.flightData.departure_date,
        return_date: this.flightData.return_date
      })
    });

    this.flightService.getAllFlights().subscribe(data => this.gFlightData = data);

    // The main form group and form controls
    this.form = new FormGroup({
      id: new FormControl({ value: '', disabled: true }),
      flight_no: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(7)]),
      airline: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      trip_type: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(25)]),
      departure_airport: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]),
      arrival_airport: new FormControl('', [Validators.required, Validators.minLength(2), Validators.maxLength(5)]),
      departure_date: new FormControl(this.util.getTodayDate(), [Validators.required]),
      return_date: new FormControl(this.util.getTodayDate(), [Validators.required]),
    });
  }

  /**
   * Check for field validity and assign is-invalid class to host element
   * @param field1 
   * @param field2 
   */
  isValid(field1, field2 = null) {
    return (
      this.form.controls[field1].errors?.required ||
        this.form.controls[field1].errors?.minLength ||
        this.validReqs[field1].error ||
        this.validReqs[field2]
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

    //##### NOT NEEDED - DISABLED FIELD ##########
    // Remove idExists error message for id field
    // if (name === 'id') {
    //   this.validReqs.idExists = null;
    //   value = parseInt(value);
    // }

    // Uppercase all airport names
    if (name === 'departure_airport' || name === 'arrival_airport') {
      this.validReqs.sameAirportError = null;
      value = value.toUpperCase();
    }

    if (name === 'departure_date' || name === 'return_date') {
      this.validReqs.datesError = null;
    }

    // Uppercase flight number
    if (name === 'flight_no') {
      value = value.toUpperCase();
    }

    // Capitalize first letter of each word of airline name
    if (name === 'airline') {
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
      if (key === 'id'){
        //this.flightData[key] = this.flightData[key];
      }
      else
        this.flightData[key] = this.flightData[key].trim();
    });

    this.validateForm();

    if (!this.error) {
      this.flightService.updateFlight(this.id, this.flightData)
        .subscribe(data => {
          this.submitted = true;
          console.log(data);
        });
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
      flightData: this.gFlightData,
      validReqs: this.validReqs,
      errMessages: this.errMessages,
      error: this.error,
      id: this.id,
      action: 'edit'
    }

    // Validate all requirements
    validObj = this.util.validateAll(obj)

    // Update the error flag and validReqs object
    this.error = validObj.error;
    this.validReqs = validObj.validReqs;

    //###### NOT NEEDED - USING UTIL FUNCTIONS ##########################
    // if (this.id !== obj.data.id) {
    //   // Check for unique id - if exists then try again
    //   if (values.indexOf(obj.data.id) !== -1) {
    //     this.validReqs.idExists = this.errMessages.idExists;
    //     this.error = true;
    //   }

    //   // Check if id is within number range
    //   if (obj.data.id < 1) {
    //     this.validReqs.id.error = this.errMessages.idError;
    //     this.error = true;
    //   }
    // }

    // //  Check if Flight No is within character range
    // if (obj.data.flight_no.length < 5) {
    //   this.validReqs.flight_no.error = this.errMessages.flight_noError;
    //   this.error = true;
    // }

    // // Check if Airline is within character range
    // if (obj.data.airline.length < 2) {
    //   this.validReqs.airline.error = this.errMessages.airlineError;
    //   this.error = true;
    // }

    // // Check if Departure Airport is within character range
    // if (obj.data.departure_airport.length < 2) {
    //   this.validReqs.departure_airport.error = this.errMessages.departure_airportError;
    //   this.error = true;
    // }

    // // Check if Arrival Airport is within character range
    // if (obj.data.arrival_airport.length < 2) {
    //   this.validReqs.arrival_airport.error = this.errMessages.arrival_airportError;
    //   this.error = true;
    // }

    // // Check if airports are same
    // if (obj.data.departure_airport !== '' && obj.data.departure_airport === obj.data.arrival_airport) {
    //   this.validReqs.sameAirportError = this.errMessages.sameAirportError;
    //   this.error = true;
    // }

    // // Check if Departure Date is valid
    // if (obj.data.departure_date.length === 0) {
    //   this.validReqs.departure_date.error = this.errMessages.departure_dateError;
    //   this.error = true;
    // }
    // // Check if Return Date is valid
    // if (obj.data.return_date.length === 0) {
    //   this.validReqs.return_date.error = this.errMessages.return_dateError;
    //   this.error = true;
    // }

    // // Convert date strings to Date
    // // Check if Departure Date is after Return Date
    // if (new Date(obj.data.departure_date) > new Date(obj.data.return_date)) {
    //   this.validReqs.datesError = this.errMessages.datesError;
    //   this.error = true;
    // }

  }
}