import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Employee } from '../models/employee';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

	constructor(private http: HttpClient) { }
	login(): Observable<any> {
		return this.http.post<any>('/api/login', {
			email: 'cwood@agi.teamlinkage.com',
			password: '3Pb9OAls'
		}).pipe(
			map((res: any) => res.data),
			catchError(this.handleError)
		);
	}
	getSession(): Observable<Employee> {
		return this.http.get('/api/session')
		.pipe(
			map((res: any) => this.mapEmployee(res)),
			catchError(this.handleError)
		);
	}

	getProjects(link: string): Observable<Object> {
		// return this.http.get('api/employee/data/projects');
		return this.http.get(link);
	}
	
	getProject(id: number): Observable<Object> {
		return this.http.get('/api/project/' + id);
	}
	
	addProject(name: string): Observable<Object> {
		console.log('creating a project');
		// this.http.post('api/employee/data/project',
		// {
		// 	'project_id' : '2',
		// 	'name' : name,
		// 	'employee_id' : '2',
		// });
		return this.http.post('api/project', {
			'name' : name,
			'start' : new Date("2015-03-25"),
			'stop' : new Date("2015-03-25"),
		});
	}

	private mapEmployee(res): Employee {
	  let employee = new Employee(
		res.data.id,
		res.data.first_name,
		res.data.last_name,
		res.data.title,
		res.data.location,
		((res.data.department) ? res.data.department.id : undefined),
		((res.data.department) ? res.data.department.name : undefined),
		res.data.description,
		res.data.birth_date,
		res.data.email,
		res.data.image_id,
		res.data.phone_number,
		((res.data.account) ? res.data.account.id : undefined),
		((res.data.account) ? res.data.account.organization : undefined),
		res.data.online
	  );
	  return employee;
	}

	private handleError(err: any) {
		console.log(err);
		try {
			var errorObj = err.error;
			if (errorObj.status === 'fail') {
				alert(errorObj.data.message);
			} else if (errorObj.status === 'error') {
				alert(errorObj.message);
			} else {
				alert("There was a problem with our hyperdrive and we couldn't retrive your data!");
			}
			return throwError(errorObj);
		} catch (e) {
			return throwError(err);
		}
	}
}
