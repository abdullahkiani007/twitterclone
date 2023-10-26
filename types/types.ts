import {Document, PopulatedDoc} from "mongoose"


export interface Iuser extends Document  {
    name: string;
    email: string;
    password: string;
    emailVerified: boolean,
    age: number,
    verificationCode: string
  }


  // import user type containing id
  export type Imuser={
    _id:string,
    name: string;
    email: string;
    password: string;
    emailVerified: boolean,
    age: number,
    verificationCode: string
  }
  
  export interface Itweet extends Document   {
   
    user: PopulatedDoc<Iuser>;
    content: string;
    likes: string[];
    comments: string[];
    retweets: string[];
    media: string;
    createdAt:string;
  }
  
  
  