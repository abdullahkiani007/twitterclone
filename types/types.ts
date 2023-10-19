

export type Iuser = {
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
  
  export type Itweet  = {
   
    user: string;
    content: string;
    likes: [];
    comments: [];
    retweets: [];
    media: string;
  }
  
  
  