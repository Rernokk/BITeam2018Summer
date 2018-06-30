import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import * as $ from 'jquery';
import { Employee } from './models/employee';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
	constructor(public loginService: LoginService) {}
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
		this.constructReviewCard();
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
				this.getEmployees();
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

	toggleReview(val: number) {
		this.isViewing = !this.isViewing;
		if (val === 0) {
			this.targetEmployee = null;
		}
	}

	writeComment(emp: object) {
		console.log("Writing comment for " + emp['first_name']);
		this.isViewing = false;
		this.targetEmployee = emp as Employee;
		this.fetchReview();
	}

	displayPhone(emp: object) {
		console.log("Displaying phone of " + emp['first_name'] + ", " + emp['phone_number']);
	}

	displayEmail(emp: object) {
		console.log("Displaying email of " + emp['first_name'] + ", " + emp['email']);
	}

	setRating(rating: number) {
		this.targetRating = rating;
		
	}

	setClass() {
		return "tempClass";
	}

	fetchReview() {
		console.log("Fetching Reviews");
	}

	submitReview() {
		console.log(this.currentFeedback);
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
}
