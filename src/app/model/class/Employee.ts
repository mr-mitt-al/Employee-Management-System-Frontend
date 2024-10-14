export class Employee{
    id:0;
    first_name: string;
    last_name: string;
    email: string;
    age: number;
    phone_number: string;
    position: string;
    description: string;
    hiring_date: string;
    profile_picture?: File;
    
    constructor()
    {
        this.id=0;
        this.first_name = '';
        this.last_name = '';
        this.email = '';
        this.age = 0;
        this.phone_number = '';
        this. position = '';
        this.description = '';
        this.hiring_date = '';
    }
  }