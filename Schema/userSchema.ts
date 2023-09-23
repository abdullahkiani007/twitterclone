import * as yup from 'yup'
import { InferType } from 'yup'

const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,25}$/;

export const userSchema = yup.object().shape({
    name: yup.string().required("Please Enter the name").max(50,"Only 50 characters are allowed").min(8,"Atleast 8 characters are required"),
    email: yup.string().email("Enter the correct Email").required("Please Enter the Email"),
    password: yup.string().required("Please Enter the password").matches(passwordPattern,"Password must be atleast 8 characters long and must contain only alphabets and numbers"),
    confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "passwords donot match")
    .required("password is required"),
    

})

// const user = await userSchema.validate(await fetchUser());

export type User = InferType<typeof userSchema>;