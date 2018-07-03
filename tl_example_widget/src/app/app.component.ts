import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import * as $ from 'jquery';
import { Employee } from './models/employee';
import { HttpClient } from '@angular/common/http';
import { DISABLED } from '@angular/forms/src/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(public loginService: LoginService, private http: HttpClient) {}
	title = 'widget example';
	employee: any;
	
	mode: string = 'small';
	projectName: string;
	currentFeedback: string;
	
	isAdmin: boolean;
	isViewing: boolean;

	reviewCards: Array<object>;
	projectEmployees: Array<object>;
	projects: Array<object>;
	temp: Array<object>;

	currentProject: number;
	sortMethod: number;
	targetRating: number = 1;
	employeeNumber: number;
	currentReview: number;
	currentProjectID: number;
	projectAverage: number;

	employeeLoaded: boolean = false;
	
	targetEmployee: Employee = null;

	ngOnInit() {		
		// note that the login function is only needed durring development of the widget

		var lSub = this.loginService.login().subscribe(data => {
			var lSub2 = this.loginService.getSession().subscribe(employee => {
				this.employee = employee;
				console.log(employee);
				lSub.unsubscribe();
				lSub2.unsubscribe();
				this.employeeLoaded = true;
				this.getProjects();
			});
		});

		this.checkWidth();

		$(window).resize(e => {
			this.checkWidth();
		});

		this.reviewCards = new Array<object>();
		this.projectEmployees = new Array<object>();
		this.projects = new Array<object>();
		this.temp = new Array<object>();
		for (var i = 0; i < 5; i++) {
			this.temp.push({"a": i});
		}

		this.isAdmin = false;
		this.isViewing = true;
		this.sortMethod = 0;
		this.employeeNumber = 0;
		this.currentFeedback = "";
		this.currentReview = 0;
		this.currentProjectID = 0;
		this.projectAverage = 4.5;
		// this.constructReviewCard();
	}

	private checkWidth() {
		if ($(window).width() > 500) {
			this.mode = 'large';
		} else {
			this.mode = 'small';
		}
	}

	getProjects() {
		this.projects = [];
			
		this.loginService.getProjects('/api/department/1/projects').subscribe(obj => {
			for (var i = 0; i < obj['data'].length; i++) {
				this.loginService.getProject(obj['data'][i]['id']).subscribe(obj2 => {
					this.projects.push(obj2);
					this.projects = this.projects.sort((q1, q2) => ((q1['data']['name']) > (q2['data']['name']) ? 1 : -1));
					this.getEmployees();
				});
			}
		});
	}

	getEmployees() {
		this.projectEmployees = [];
		if (this.projects[this.currentProject] != null) {
			for (var i = 0; i < this.projects[this.currentProject]['data']['employees'].length; i++) {
				this.projectEmployees.push(this.projects[this.currentProject]['data']['employees'][i]);
				console.log(this.projectEmployees[0]);
			}
			this.employeeNumber = this.projects[this.currentProject]['data']['employees'].length;
		}
	}

	sortEmployees(val: string) {
		switch (val) {
			case('0'):
				this.projectEmployees = this.projectEmployees.sort((q1, q2) => ((q1['first_name']) > (q2['first_name']) ? 1 : -1));
				break;
			case('1'):
				this.projectEmployees = this.projectEmployees.sort((q1, q2) => ((q1['first_name']) > (q2['first_name']) ? -1 : 1));
				break;
			case('2'):
				this.projectEmployees = this.projectEmployees.sort((q1, q2) => ((q1['last_name']) > (q2['last_name']) ? 1 : -1));
				break;
			case('3'):
				this.projectEmployees = this.projectEmployees.sort((q1, q2) => ((q1['last_name']) > (q2['last_name']) ? -1 : 1));
				break;
		}
	}
	
	targetProject(val: string) {
		console.log(val);
		for (var i = 0; i < this.projects.length; i++) {
			if (this.projects[i]['data']['name'] === val) {
				this.currentProject = i;
				this.currentProjectID = this.projects[i]['data']['id'];
				console.log(this.projects[i]);
				this.getEmployees();
				this.fetchReviews();
				return;
			}
		}
	}

	addProject() {
		console.log("Creating Project w/ name: " + this.projectName);
		this.loginService.addProject(this.projectName).subscribe(obj => {
			console.log(obj);	
		});
	}

	addEmployee() {
		this.projectEmployees.push({'name' : 'John Doe'});
	}

	constructReviewCard() {
		console.log("adding review");
		this.reviewCards.push({ "content" : "John Doe" });
		this.reviewCards.push({ "content" : "James Doe" });
		this.reviewCards.push({ "content" : "Jane Doe" });
		this.reviewCards.push({ "content" : "Jill Doe" });
	}

	toggleAdmin() {
		this.isAdmin = !this.isAdmin;
	}

	toggleReview(emp: object) {
		if (this.employee.id === (emp as Employee).id){
			return;
		}

		if (this.targetEmployee == null){
			this.targetEmployee = emp as Employee;
			this.isViewing = false;
		} else if (this.targetEmployee === emp as Employee) {
			this.disableReview();
			return;
		} else {
			this.targetEmployee = emp as Employee;
			this.isViewing = false;
		}
		this.http.get("http://localhost:3000/api/requestReview/" + this.employee.id + "/" + this.targetEmployee.id + "/" + this.currentProjectID).subscribe((obj: Array<object>) => {
			if (obj['ret'].length > 0){
				this.currentFeedback = obj['ret'][0]['comment'];
				this.targetRating = obj['ret'][0]['rating'];
			}
		});
	}

	disableReview() {
		this.targetEmployee = null;
		this.isViewing = true;
	}

	writeComment() {
		// this.http.get("http://localhost:3000/api/pushReview/jsonJohn/0/jsonJack/4/2/Good Job/4").subscribe(() => {
		this.http.get("http://localhost:3000/api/pushReview/" + this.employee.first_name + " " + this.employee.last_name +"/" + this.employee.id + "/" + this.targetEmployee.first_name + " " + this.targetEmployee.last_name + "/" + this.targetEmployee.id +"/" + this.targetRating + "/" + this.currentFeedback + "/" + this.currentProjectID).subscribe(() => {
			console.log("Commented");	
		});
	}

	updateComment(){
		this.http.get("http://localhost:3000/api/updateReview/" + this.employee.first_name + " " + this.employee.last_name +"/" + this.employee.id + "/" + this.targetEmployee.first_name + " " + this.targetEmployee.last_name + "/" + this.targetEmployee.id +"/" + this.targetRating + "/" + this.currentFeedback + "/" + this.currentProjectID).subscribe(() => {
			console.log("Updated Comment");	
		});
	}
	
	fetchEmployeePicture(image_id: string) {

	}

	displayPhone(emp: object) {
		console.log("Displaying phone of " + emp['first_name'] + ", " + emp['phone_number']);
	}

	displayEmail(emp: object) {
		console.log("Displaying email of " + emp['first_name'] + ", " + emp['email']);
	}

	setRating(rating: number) {
		this.targetRating = rating;
		console.log("Set rating: " + rating);
	}
	
	fetchReviews() {
		console.log("Fetching Reviews");
		this.http.get('http://localhost:3000/api/fetchReviews/' + this.currentProjectID + '/' + this.employee.id).subscribe((val: Array<object>) => {
		   	console.log(val);
			this.reviewCards = [];
			this.projectAverage = 0;
			
			for (var i = 0; i < val['ret'].length; i++){
				this.reviewCards.push(this.parseReview(val['ret'][i]));
				this.projectAverage += +(val['ret'][i]['rating']);
			}
			this.projectAverage /= val['ret'].length;
		});
	}

	parseReview(obj: object): object {
		var retObj: object;
		retObj = {
			'author' : obj['author'],
			'recipient' : obj['recipient'],
			'rating' : obj['rating'],
			'feedback' : obj['comment'],
			'editor' : obj['editor']
		};
		return retObj;
	}

	submitReview() {
		this.targetReview();
	}

	moveReviews(dir: number) {
		this.currentReview += dir;
		if (this.currentReview < 0) {
			this.currentReview = this.reviewCards.length - 1;
		} else if (this.currentReview >= this.reviewCards.length) {
			this.currentReview = 0;
		}
		console.log(this.currentReview);
	}

	getReviewRating(): number {
		if (this.reviewCards.length === 0){
			return 0;
		}
		return (this.reviewCards[this.currentReview]['rating']);
	}

	targetReview() {
		console.log("Looking for reviews.");
		this.http.get("http://localhost:3000/api/requestReview/" + this.employee.id + "/" + this.targetEmployee.id + "/" + this.currentProjectID).subscribe((obj: Array<object>) => {
			console.log(obj);
			if (obj['ret'].length > 0){
				this.updateComment();
			} else {
				this.writeComment();
			}
		});
	}
}


// Start server w/ ng serve --open --proxy-config prox.conf.json
// db4free.net test server, login info in hello.js line 27
