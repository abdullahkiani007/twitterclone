

export type Iuser = {
    name: string;
    email: string;
    password: string;
    emailVerified: boolean,
    age: number,
    verificationCode: string
  }
  
  export type Itweet  = {
    tweet: string;
    user: string;
    likes: number;
    comments: number;
    retweets: number;
    media: string;
  }
  
  
  