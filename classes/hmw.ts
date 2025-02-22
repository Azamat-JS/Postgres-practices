//--------------- 1

// class Car {
//     model: string;
//     year: number;
//     color: string;

//     constructor(model: string, year: number, color: string) {
//         this.model = model;
//         this.year = year;
//         this.color = color;
//     }

//     changeColor(newColor: string): string {
//         this.color = newColor;
//         return this.color;
//     }
// }

// const adCar = new Car('honda', 2024, 'black');
// const newColor = adCar.changeColor('white');
// console.log(adCar);

//----------- 2

// class Student{
//     firstName:string;
//     lastName:string;
//     grade:number;

//     constructor(firstName:string, lastName:string, grade:number){
//        this.firstName = firstName;
//        this.lastName = lastName;
//        this.grade = grade
//     }

//     fullName (){
//         return `${this.firstName} ${this.lastName}`
//     }

//     updateGrade(newGrade:number){
//        this.grade = newGrade
//        return this.grade
//     }
// }

// const student = new Student('Aziz', 'Asadov', 7)
// console.log(student.fullName())
// student.updateGrade(8)
// console.log(student);

//----------------- 3

// class BankAccount {
//   private balance: number;
//   constructor(balance: number) {
//     this.balance = balance;
//   }

//   public deposit(money: number) {
//     return this.balance + money;
//   }

//   public withdraw(money: number) {
//     return this.balance - money;
//   }
// }

// const balance = new BankAccount(4000);
// console.log(balance.deposit(500));
// console.log(balance.withdraw(1000));

//--------------- 4

// class UserAccount {
//     public userName:string;
//     private password:string;
//     constructor(userName:string, password:string){
//         this.userName = userName;
//         this.password = password
//     }

//     updatePassword(newPassword: string){
//         this.password = newPassword
//         return this.password
//     }
//     protected isActive(checkActivation:boolean){
//       console.log(`Is user active: ${checkActivation}`);

//     }
// }

// const user = new UserAccount('$#anvar', '123aaa')
// user.updatePassword('444www')
// console.log(user);

// class CheckUser extends UserAccount {

//     checkActivation(check:boolean):void{
//         this.isActive(check)
//     }
// }

// const userNow = new CheckUser('aziz', 'sdfa11')
// userNow.checkActivation(false)
// console.log(userNow);

//------------ 5

// interface Animal {
//     name:string;
//     age:number;
//     speak():string;
// }

// class Dog implements Animal{
//     constructor(public name:string, public age:number, private sound:string){}

//     speak():string{
//         return `${this.name} ${this.sound}`
//     }
// }

// class Cat implements Animal {
//     constructor(public name:string, public age:number, private sound:string){}
// speak(): string {
//     return `${this.name} ${this.sound}`
// }

// }
// const dog = new Dog('bobik', 2, 'barks')
// console.log(dog.speak());

// const cat = new Cat('chers', 1, 'meows')
// console.log(cat.speak());

//------------- 6

// interface RentalItem {
//     id:number;
//     name:string;
//     pricePerDay:number;
//     rentItem(day:string):string;
//     returnItem(day:string):string;
// }

// class CarRental implements RentalItem {
//     constructor(public id:number, public name:string, public pricePerDay:number, private brand:string){}

//     rentItem(day:string): string {
//         return `${this.brand} was rented by ${this.name} at $${this.pricePerDay}/day on ${day}`
//     }

//     returnItem(day:string):string {
//         return `${this.brand} was returned by ${this.name} on ${day}`
//     }
// }

// class HouseRental implements RentalItem {
//     constructor(public id:number, public name:string, public pricePerDay:number, private address:string){}

//     rentItem(day:string): string {
//         return `${this.address} was rented by ${this.name} at $${this.pricePerDay}/day on ${day}`
//     }

//     returnItem(day:string):string {
//         return `${this.address} was returned by ${this.name} on ${day}`
//     }
// }

// const car = new CarRental(1, 'Aziz', 30, 'Lada')
// console.log(car);
// console.log(car.rentItem('12-02-25'))
// console.log(car.returnItem('22-02-25'))

// const flat = new HouseRental(1, 'Umar', 60, '27-appartment 12-room')
// console.log(flat);
// console.log(flat.rentItem('10-01-25'));
// console.log(flat.returnItem('20.02.25'));

//-------------- 7

// abstract class Calculator {
//   abstract add(n: number, m: number): number;
//   abstract subtract(n: number, m: number): number;
//   abstract multiply(n: number, m: number): number;
// }

// class Algebra extends Calculator {
//   add(n: number, m: number): number {
//     return n + m;
//   }
//   subtract(n: number, m: number): number {
//     return n - m;
//   }
//   multiply(n: number, m: number): number {
//      return n * m
//   }
// }

// const algebra = new Algebra();
// console.log(algebra.add(5, 3));  
// console.log(algebra.subtract(5, 3)); 
// console.log(algebra.multiply(5, 3)); 

//------------- 8

// abstract class Shape {
//     abstract getArea(height:number, width:number):number;
//     abstract getPerimeter(height:number, width:number):number;
// }

// class Circle extends Shape {
//     getArea(PI: number, radius: number): number {
//         return PI * radius * radius
//     }
//     getPerimeter(PI: number, radius: number): number {
//         return PI * radius * 2
//     }
// }

// class Rectangle extends Shape {
//     getArea(height: number, width: number): number {
//         return height * width
//     }
//     getPerimeter(height: number, width: number): number {
//         return (height + width) * 2
//     }
// }

// const circle = new Circle()
// console.log(circle.getArea(3.14, 4));
// console.log(circle.getPerimeter(3.14, 4));

// const rectangle = new Rectangle()
// console.log(rectangle.getArea(4, 5));
// console.log(rectangle.getPerimeter(4, 5));


