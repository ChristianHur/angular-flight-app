
export class Util {

    /**
     * Validation requirements
     */
    validReqs = {
        id: { required: true, min: 1, max: 99999, error: null },
        flight_no: { required: true, min: 5, max: 10, error: null },
        airline: { required: true, min: 2, max: 25, error: null },
        trip_type: { required: true, error: null },
        departure_airport: { required: true, min: 2, max: 5, error: null },
        arrival_airport: { required: true, min: 2, max: 5, error: null },
        departure_date: { required: true, error: null },
        return_date: { required: true, error: null },
        idExists: null,
        sameAirportError: null,
        datesError: null,
    }

    /**
     * Error messages to display on the site
     */
    errMessages = {
        idExists: "This id already exists. Try again.",
        idError: "Enter between 1 and 9999",
        flight_noError: "Enter between 5-10 characters",
        airlineError: "Enter between 2-25 characters",
        departure_airportError: "Enter between 2-5 characters",
        arrival_airportError: "Enter between 2-5 characters",
        sameAirportError: "Arrival airport cannot be the same as Departure airport",
        departure_dateError: "Departure Date is required",
        return_dateError: "Return Date is required",
        datesError: 'Return Date cannot be earlier than Departure Date'
    }

    /**
     * Validate all requirements at once
     * @param val 
     */
    validateAll(val) {
        let obj = null;
        if (val.action == 'add'){
            obj = this.validateId(val)
        }
        obj = this.validateFlightNo(val)
        obj = this.validateAirline(val)
        obj = this.validateDepartureAirport(val)
        obj = this.validateArrivalAirport(val)
        obj = this.validateSameAirports(val)
        obj = this.validateDepartureDate(val)
        obj = this.validateReturnDate(val)
        obj = this.vaildateInvalidDates(val)
        return obj;
    }

    /**
     * Function to validate flight id.  Checks for duplicates and number range
     * @param val 
     */
    validateId(val) {
        if ((val.id !== val.data.id && val.action === 'edit') || val.action === 'add') {
            // Extract the values for all id fields from full data set
            let values = val.flightData.map(e => e.id);

            // Check for unique id - if exists then try again
            if (values.indexOf(val.data.id) !== -1) {
                val.validReqs.idExists = val.errMessages.idExists;
                val.error = true;
            }

            // Check if id is within number range
            if (val.data.id < 1) {
                val.validReqs.id.error = val.errMessages.idError;
                val.error = true;
            }
        }
    }

    /**
     * Check if Flight No is within character range
     * @param val 
     */
    validateFlightNo(val) {
        if (val.data.flight_no.length < 5) {
            val.validReqs.flight_no.error = val.errMessages.flight_noError;
            val.error = true;
        }
        return val;
    }

    /**
     * Function to validate airline name is within character range.
     * @param val 
     */
    validateAirline(val) {
        if (val.data.airline.length < 2) {
            val.validReqs.airline.error = val.errMessages.airlineError;
            val.error = true;
        }
        return val;
    }

    /**
     * Check if Departure Airport is within character range
     * @param val 
     */
    validateDepartureAirport(val) {
        if (val.data.departure_airport.length < 2) {
            val.validReqs.departure_airport.error = val.errMessages.departure_airportError;
            val.error = true;
        }
        return val;
    }

    /**
     * Check if Arrival Airport is within character range
     * @param val 
     */
    validateArrivalAirport(val) {
        if (val.data.arrival_airport.length < 2) {
            val.validReqs.arrival_airport.error = val.errMessages.arrival_airportError;
            val.error = true;
        }
        return val;
    }

    /**
     * Check if airports are same
     * @param val 
     */
    validateSameAirports(val) {
        if (val.data.departure_airport !== '' && val.data.departure_airport === val.data.arrival_airport) {
            val.validReqs.sameAirportError = val.errMessages.sameAirportError;
            val.error = true;
        }
        return val;
    }

    /**
     * Check if Departure Date is valid
     * @param val 
     */
    validateDepartureDate(val) {
        if (val.data.departure_date.length === 0) {
            val.validReqs.departure_date.error = val.errMessages.departure_dateError;
            val.error = true;
        }
        return val;
    }

    /**
     * Check if Return Date is valid
     * @param val 
     */
    validateReturnDate(val) {
        if (val.data.return_date.length === 0) {
            val.validReqs.return_date.error = val.errMessages.return_dateError;
            val.error = true;
        }
        return val;
    }

    /**
     * Convert date strings to Date
     * Check if Departure Date is after Return Date
     * @param val 
     */
    vaildateInvalidDates(val) {
        if (new Date(val.data.departure_date) > new Date(val.data.return_date)) {
            val.validReqs.datesError = val.errMessages.datesError;
            val.error = true;
        }
        return val;
    }

    /**
   * Function to get today's date
   * @returns today's date "mm/dd/yyyy" format
   */
  getTodayDate() {
    let today = new Date();
    return today.toISOString().substring(0, 10);
  }
}