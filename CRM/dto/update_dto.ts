export interface IUpdateStudentDto {
    student_name?:string;
    student_phone?:string;
    subject?:string;
    parents_name?:string;
    parents_phone?:string;
}

export interface IUpdateGroupDto {
    subject?:string;
    days?:string;
    startTime?:string;
    endTime?:string;
    teacher_name?:string;
    teacher_phone?:string;
}

export interface IUpdatePaymentDto {
    student_name?:string;
    student_phone?:string;
    subject?:string;
    teacher_name?:string;
    date?:string;
}