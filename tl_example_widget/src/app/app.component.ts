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
	
	ngOnInit() {
		// note that the login function is only needed durring development of the widget

		//Login (Temporarily Disabled while servers are down)
		var lSub = this.loginService.login().subscribe(data => {
			var lSub2 = this.loginService.getSession().subscribe(employee => {
				this.employee = employee;
				console.log(employee);
				lSub.unsubscribe();
				lSub2.unsubscribe();
				
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
		
		this.loginService.getProjects().subscribe(obj => {
			for(var i = 0; i < obj['data'].length; i++){
				this.loginService.getProject(obj['data'][i]['project_id']).subscribe(obj2 => {
					this.projects.push(obj2);
					console.log(this.projects[i - 1]);
				});
			}
		});
	}

	addProject() {
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
