export interface User{
    key?: string;
    name : string;
    mail : string;
    pass : string;
    verified ?:boolean; 
    phone?: string;
    lastlogin?:string;
    created?:string;
}