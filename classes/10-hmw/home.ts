//------- 1 - -------------

// interface Product {
//     id: number;
//     name:string;
//     price:number;
//     description:string;
// }

// const partialProduct: Partial<Product> = {id: 1, name: 'milk', price:120}
// const readOnlyPorduct: Readonly<Product> = {id:2, name: 'honey', price:140, description: 'natural product'}

//------------- 2

// namespace MathOperations {
//     export function add(a:number, b:number):number{
//         return a + b
//     }

//     export function subtract(a:number, b:number):number{
//         return a - b
//     }

//     export function mutilply(a:number, b:number):number{
//         return a * b
//     }

//     export function division(a:number, b:number):number{
//         return a / b
//     }
// }

// console.log(MathOperations.add(3, 5));
// console.log(MathOperations.subtract(15, 5));
// console.log(MathOperations.mutilply(3, 5));
// console.log(MathOperations.division(15, 5));

///-------------- 3

// function logClass(constructor: Function): void {
//     console.log(`Class ${constructor.name} initialized`);
// }


// function logMethod(
//     target: Object, 
//     propertyKey: string, 
//     descriptor: PropertyDescriptor
//   ): PropertyDescriptor {
//       const originalMethod = descriptor.value;
//       descriptor.value = function (...args: any[]) {
//           console.log(`Method ${propertyKey} called with:`, args);
//           return originalMethod.apply(this, args);
//       };
//       return descriptor; 
//   }
  

// @logClass
// class School {
//     @logMethod
//     students(name: string, age: number): (string | number)[] {
//         return [name, age];
//     }
// }

// const school = new School(); 
// console.log(school.students('John', 20)); 

//-------------- 4

// function filterByProperty<T>(items:T[], key: keyof T, value:any): T[] {
//     const result =  items.filter(item => key === value)
//     return result
// }


//------------- 5
// function validaString(target: Object, propertyKey: string): void {
//     let value: string;

//     const getter = () => value;
//     const setter = (newValue: string) => {
//         if (typeof newValue !== 'string' || newValue.trim() === '') {
//             console.error(`Invalid value for ${propertyKey}`);
//         } else {
//             value = newValue;
//         }
//     };

//     Object.defineProperty(target, propertyKey, {
//         get: getter,
//         set: setter,
//         enumerable: true,
//         configurable: true,
//     });
// }

// class User {
//    id: number;

//    @validaString
//    name: string;

//    age: number;
//    address: string;

//    constructor(id: number, name: string, age: number, address: string) {
//        this.id = id;
//        this.name = name; 
//        this.age = age;
//        this.address = address;
//    }
// }

// const user = new User(11, '', 23, 'Navoiy street'); 
// user.name = '   '; 
// user.name = 'Asad';



//-------------- 6

// function getData(data:unknown):void{
//   if(typeof data === "number"){
//     console.log(data * 2);
//   }else{
//     console.log(data);
//   }
// }

// getData(4)

/////

// function getNever():never{
//     while(true){
//         console.log('2');
//     }
// }

