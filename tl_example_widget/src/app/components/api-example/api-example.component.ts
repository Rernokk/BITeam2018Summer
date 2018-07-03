import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';

class Review {
  constructor(
	public month: number,
	public year: number,
	public day: number,
	public reviewText: string,
	public rating: number,
	public writer: string,
	public writer_id: number,
	public receiver: string,
	public receiver_id: number,
	public _new: boolean,
	public edited: boolean,
	public editor: string,
	public editor_id: number,
	public project_id:number,
	private http: HttpClient
  ) {
  }
  
  public saveReview(fileName:string){
	  let saver: ReviewSaver = new ReviewSaver(this.http);
	  let savedFile: Observable<object> = saver.saveReview(fileName, this);
	  
	  savedFile.subscribe(data => {
		  
	  });
  }
  
  public loadReview(fileName:string, projectID:string, receiverID:number){
	let loader: ReviewLoader = new ReviewLoader(this.http);
	
	let loadedData: Observable<object> = loader.loadReview(fileName);
	loadedData.subscribe(data => {
		console.log(data);
	});
  }
}

class ReviewLoader{
	constructor(private http:HttpClient){}
	
	loadReview(fileName:string): Observable<object>{
		return this.http.get('assets/' + fileName);
	}
}	

class ReviewSaver{
	constructor(private http:HttpClient){}
	
	saveReview(fileName:string, review:Review): Observable<object>{
		return this.http.post<object>('assets/' + fileName, 
			{
			}
		)
		.pipe(
			map((res: any) => res.data),
			catchError(this.handleError)
		);
	}
	
	public handleError(err: any) {
		console.log(err);
		try {
			var errorObj = err.error;
			if (errorObj.status === 'fail') {
				alert(errorObj.data.message);
			} else if (errorObj.status === 'error') {
				alert(errorObj.message);
			} else {
				alert("Is broke, no save");
			}
			return throwError(errorObj);
		} catch (e) {
			return throwError(err);
		}
	}
}

@Component({
  selector: 'app-api-example',
  templateUrl: './api-example.component.html',
  styleUrls: ['./api-example.component.scss']
})
export class ApiExampleComponent implements OnInit {
	r: Review;
	data;
  constructor(private http: HttpClient) { }

  ngOnInit() {
	  // Temp date info
	  let date: Date = new Date();
	  
	  let month: any = date.getUTCMonth() + 1;
	  let day: any = date.getUTCDate();
	  let year: any = date.getUTCFullYear();
	  
	  let review: string = "This is a test review string";
	  let rating: number = 4;
	  let writer: string = "Bryce";
	  let writerID: number = 1;
	  let receiver: string = "Shannon";
	  let receiverID: number = 3;
	  let _new: boolean = true;
	  let _edited: boolean = false;
	  let editor: string = "";
	  let editorID: number = -1;
	  let projectID: number = 1;
	  
	  this.r = new Review(month, year, day, review, rating,
						writer, writerID, receiver, receiverID, _new, _edited,
						editor, editorID, projectID, this.http);
						
	// r.saveReview("testFile.json");
	// r.loadReview("testFile.json", "lol", 0);
  }
  
  saveReview() {
	 this.r.saveReview("testFile.json");
  }
  
  loadReview() {
	 // this.r.loadReview("testFile.json", "lol", 0);
	this.http.get('http://localhost:3000/api/fetchReviews/1/2').subscribe((val: Review) => {
	 	console.log(val);
	 	this.r.receiver = val['reviewee'];
  	});
  }
}
