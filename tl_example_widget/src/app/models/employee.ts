export class Employee {
	public full_name: string;
  constructor(
    public id: number,
    public first_name: string,
    public last_name: string,
    public title: string,
    public location: string,
    public department_id: number,
    public department: string,
    public description: string,
    public birth_date: string,
    public email: string,
    public image_id: string,
    public phone_number: number,
    public account_id: number,
    public organization: string,
    public online: string
  ) {
	  // add extras here
	  this.full_name = this.first_name + " " + this.last_name;
  }
}
