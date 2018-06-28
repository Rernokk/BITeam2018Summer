import { Component, OnInit } from '@angular/core';
import { LoginService } from './services/login.service';
import * as $ from 'jquery';

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
	isAdmin: boolean;
	isReviewing: boolean;

	reviewCards: Array<object>;
	projectEmployees: Array<object>;
	projects: Array<object>;
	temp: Array<object>;
	currentProject: number;
	sortMethod: number;
	employeeLoaded: boolean = false;
	
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
		this.reviewCards.push({'name' : 'John Doe'});
		this.projectEmployees.push({'name' : 'John Doe'});
		this.projects.push({"projectName" : "I am a project"});
		this.projects.push({"projectName" : "I am a project 2"});
		for (var i = 0; i < 5; i++) {
			this.temp.push({"a": i});
		}

		this.isAdmin = false;
		this.isReviewing = true;
		this.currentProject = 0;
		this.sortMethod = 0;
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
			console.log(obj);
			for (var i = 0; i < obj['data'].length; i++) {
				this.loginService.getProject(obj['data'][i]['id']).subscribe(obj2 => {
					this.projects.push(obj2);
					this.getEmployees();
				});
			}
		});
	}

	getEmployees() {
		this.projectEmployees = [];
		for (var i = 0; i < this.projects[this.currentProject]['data']['employees'].length; i++) {
			this.projectEmployees.push(this.projects[this.currentProject]['data']['employees'][i]);
		}
	}

	sortEmployees(val: string) {
		console.log(val);
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
		this.reviewCards.push({ "name" : "John Doe" });
	}

	toggleAdmin() {
		this.isAdmin = !this.isAdmin;
	}

	toggleReview() {
		this.isReviewing = !this.isReviewing;
	}
}
