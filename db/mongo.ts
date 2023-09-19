import { Schema ,model ,models} from "mongoose";


interface Iuser{
    name:string,
    email:string,
    password:string,
}
const userSchema = new Schema<Iuser>({
    name:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
})

console.log(models)
const people =models.User || model<Iuser>("User",userSchema);


export default people;
