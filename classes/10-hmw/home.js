//------- 1 - -------------
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
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
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
function validaString(target, propertyKey) {
    var value;
    var getter = function () { return value; };
    var setter = function (newValue) {
        if (typeof newValue !== 'string' || newValue.trim() === '') {
            console.error("Invalid value for ".concat(propertyKey));
        }
        else {
            value = newValue;
        }
    };
    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true,
    });
}
var User = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    return _a = /** @class */ (function () {
            function User(id, name, age, address) {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.age = __runInitializers(this, _name_extraInitializers);
                this.id = id;
                this.name = name;
                this.age = age;
                this.address = address;
            }
            return User;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [validaString];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
var user = new User(11, '', 23, 'Navoiy street');
user.name = '   ';
user.name = 'Asad';
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
