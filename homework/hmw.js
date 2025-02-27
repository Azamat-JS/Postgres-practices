//--------------- 1
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
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
//   public deposit(money: number):string {
//     this.balance += money;
//     return `${money} added to your balance your current balance: ${this.balance}`
//   }
//   public withdraw(money: number):string {
//     this.balance -= money;
//     return `${money} was withdrawn from your balance your current balance: ${this.balance}`
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
//------------ 9
// class Counter {
//     private static count:number = 0;
//     constructor(){
//         Counter.increment();
//     }
//     static increment():void{
//         Counter.count += 1
//     }
//     static getCount():number{
//         return Counter.count
//     }
// }
// const obj1 = new Counter()
// console.log(Counter.getCount());
// const obj2 = new Counter()
// console.log(Counter.getCount());
// const obj3 = new Counter()
// console.log(Counter.getCount());
//------------ 10
// class Logger {
//     private static count: string[] = [];
//     static log(message: string): void {
//       const logEntry = `[${new Date().toISOString()}] ${message}`;
//       this.count.push(logEntry);
//       console.log(logEntry);
//     }
//     static getLogs(): string[] {
//       return this.count;
//     }
//   }
//   Logger.log("Static log entry.");
//   console.log("Logs:", Logger.getLogs());
///////// Additional tasks
//---------------- 1
// class Account {
//     accountNumber:number;
//     holderName:string;
//     balance:number;
//     constructor(accountNumber:number, holderName:string, balance:number){
//         this.accountNumber = accountNumber;
//         this.holderName = holderName;
//         this.balance = balance
//     }
//     deposit(money:number):number{
//         this.balance += money
//         return this.balance
//     }
//     withdraw(money:number):string{
//         if(money > this.balance){
//             return `Insufficient funds check your balance`
//         }
//         this.balance -= money
//         return `Your balance decreased by ${money} current balance: ${this.balance}`
//     }
//     checkBalance():number{
//         return this.balance
//     }
// }
// const account = new Account(5, 'Said', 3000)
// console.log('After deposit:', account.deposit(1000));
// console.log('After withdrawal:', account.withdraw(1200));
// console.log('Current balance:', account.checkBalance());
//-------------- 2
// class AdminAccount {
//     username:string[] = []
//     constructor(username:string[]){
//         this.username = username
//     }
//     addUser(name:string):string[]{
//         this.username.push(name)
//         return this.username
//     }
//     deleteUser(name:string):string[] | string{
//       const userIndex = this.username.indexOf(name)
//       if(userIndex === -1){
//         return `User ${name} not found`
//       }
//       this.username.splice(userIndex, 1)
//       return this.username
//     }
// }
// const admin = new AdminAccount(['jasur', 'ali'])
// console.log(admin.addUser('aziz'))
// console.log(admin.addUser('umar'))
// console.log(admin.deleteUser('ilyos'));
// console.log(admin.deleteUser('ali'));
// class CustomerAccount {
//     private balance:number;
//     constructor(balance:number){
//         this.balance = balance
//     }
//     deposit(money:number):number{
//        this.balance += money
//        return this.balance
//     }
//     withdraw(money:number):number | string{
//         if(money > this.balance){
//             return `Insufficient budget to get ${money}`
//         }
//         this.balance -= money
//         return this.balance
//     }
//     checkBalance(){
//         return this.balance
//     }
// }
// const customer = new CustomerAccount(2000)
// console.log(`After deposit: `, customer.deposit(500));
// console.log(`After withdrawal: `, customer.withdraw(800));
// console.log(`Your total balance: `, customer.checkBalance());
//----------------- 3
// class Product {
//     productName: string;
//     price: number;
//     category: string;
//     constructor(productName: string, price: number, category: string) {
//         this.productName = productName;
//         this.price = price;
//         this.category = category;
//     }
// }
// class DiscountedProduct extends Product {
//     discount(percent: number): number {
//         return this.price * (1 - percent / 100);
//     }
// }
// const product = new Product('apple', 20, 'fruit');
// const discountedProduct = new DiscountedProduct('banana', 12, 'fruit');
// const totalPrice = discountedProduct.discount(30);
// console.log(`Discounted Price: ${totalPrice}`);
//----------- 4
// abstract class Character {
//    abstract attack(weapon:string):string;
//    abstract defend(shield:string):string;
// }
// class Warrior extends Character {
//     attack(weapon: string): string {
//         return `Warrior is attacking with ${weapon} to the Mage`
//     }
//     defend(shield: string): string {
//         return `Warrior defends himself by ${shield} from Mage`
//     }
// }
// class Mage extends Character {
//     attack(weapon: string): string {
//         return `Mage attacks to the Warrior with ${weapon}`
//     }
//     defend(shield: string): string {
//         return `Mage defends herself by ${shield}`
//     }
// }
// const brave = new Warrior()
// console.log(brave.attack('sword'));
// console.log(brave.defend('iron shield'));
// const witch = new Mage()
// console.log(witch.attack('broom'));
// console.log(witch.defend('metall hat'));
//---------------
function LogMethod(target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;
    descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        console.log("Method ".concat(propertyKey, " called with args: ").concat(args));
        return originalMethod.apply(this, args);
    };
}
var Calculator = function () {
    var _a;
    var _instanceExtraInitializers = [];
    var _add_decorators;
    return _a = /** @class */ (function () {
            function Calculator() {
                __runInitializers(this, _instanceExtraInitializers);
            }
            Calculator.prototype.add = function (a, b) {
                return a + b;
            };
            return Calculator;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _add_decorators = [LogMethod];
            __esDecorate(_a, null, _add_decorators, { kind: "method", name: "add", static: false, private: false, access: { has: function (obj) { return "add" in obj; }, get: function (obj) { return obj.add; } }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var calc = new Calculator();
console.log(calc.add(3, 5));
