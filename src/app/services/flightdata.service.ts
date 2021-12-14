import { Injectable } from '@angular/core';
//import { FlightData } from '../models/FlightData';
import { api } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IFlightData } from './flightdata.interface';

@Injectable({
  providedIn: 'root'
})
export class FlightdataService {

  //flightData = FlightData;
  constructor(private http: HttpClient) { }

  /**
   * Get a single flight record
   * @param id - the id of a record
   * @returns - single flight object
   */
  getFlight(id:number): Observable<any>{
    // let index = this.flightData.findIndex( e => e.id == id);
    // return this.flightData[index];
    return this.http.get(api + id);
  }
  
  /**
   * Get all flight records
   * @returns - all records
   */
  getAllFlights(): Observable<any>{
    // let index = this.flightData.findIndex( e => e.id == id);
    // return this.flightData[index];
    return this.http.get(api);
  }

  /**
   * Add a new flight record
   * @param newFlight - the new flight data
   * @returns - the new flight data that was added
   */
  addFlight(newFlight: IFlightData){
    //this.flightData.push(newFlight);
    return this.http.post(api,newFlight);
  }

  /**
   * Update a flight record
   * @param id - the existing id of a record
   * @param newFlight - the updated record
   * @returns - the new updated record
   */
  updateFlight(id:number, newFlight:IFlightData): Observable<any>{
    // let index = this.flightData.findIndex( e => e.id == id);
    // this.flightData[index] = newFlight;
    return this.http.put(api+id,newFlight);
  }

  /**
   * Delete a single flight record
   * @param id - the existing id of a record
   * @returns - successful/failure of deletion
   */
  deleteFlight(id:number){
    // let index = this.flightData.findIndex( e => e.id == id);
    // if(index !== -1){
    //   this.flightData.splice(index,1);
    // }
    return this.http.delete(api+id);
  }

  /**
   * Delete all flight records
   * @returns - successfull/failure message
   */
  deleteAll(){
     // this.flightData = [];
     return this.http.delete(api);
  }

}
