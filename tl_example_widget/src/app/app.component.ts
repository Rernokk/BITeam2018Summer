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
	reviewCards: Array<object>;
	projectEmployees: Array<object>;
	ngOnInit() {
		// note that the login function is only needed durring development of the widget
		var lSub = this.loginService.login().subscribe(data => {
			var lSub2 = this.loginService.getSession().subscribe(employee => {
				this.employee = employee;
				console.log(employee);
				lSub.unsubscribe();
				lSub2.unsubscribe();
			});
		});

		this.checkWidth();

		$(window).resize(e => {
			this.checkWidth();
		});
		this.reviewCards = new Array<object>();
		this.projectEmployees = new Array<object>();
		this.reviewCards.push({'name' : 'John Doe'});
		this.projectEmployees.push({'name' : 'John Doe'});
	}

	private checkWidth() {
		if ($(window).width() > 500) {
			this.mode = 'large';
		} else {
			this.mode = 'small';
		}
	}

	getProjects() {
		this.loginService.getProjects().subscribe(obj => {
			console.log(obj);
		});
	}

	addProject() {
		this.loginService.addProject(this.projectName).subscribe(obj => {
			console.log(obj);	
		});
	}

	constructReviewCard() {
		console.log("adding review");
		this.reviewCards.push({ "name" : "John Doe" });
	}
}