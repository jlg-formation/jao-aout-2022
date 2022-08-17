import { Person } from "./Person.js";

export class Employee extends Person {
  constructor(name, age, companyName, salary) {
    super(name, age);
    this.companyName = companyName;
    this.salary = salary;
  }

  reward(percent) {
    this.salary = this.salary + (this.salary * percent) / 100;
    console.log("youpi, my new salary is " + this.salary);
  }

  sayHello() {
    super.sayHello();
    console.log(
      "I am working for " +
        this.companyName +
        " and my salary is " +
        this.salary
    );
  }
}
