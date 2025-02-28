export class BaseError extends Error {
  success:boolean
  status:number
  errors:any[]
  constructor( message: string, success:boolean, status:number, errors:any[] = []){
        super(message)
        this.success = success;
        this.errors = errors;
        this.status = status

        Object.setPrototypeOf(this, BaseError.prototype);
  }
  static UnauthorizedError(message:string, success:boolean, status:number, errors:any[] = []){
     return new BaseError(message, success, 401, errors)
  }
  static BadRequestError(message:string, success:boolean, status:number, errors:any[] = []){
     return new BaseError(message, success, 400, errors)
  }
  static NotFoundError(message:string, success:boolean, status:number, errors:any[] = []){
     return new BaseError(message, success, 404, errors)
  }
}