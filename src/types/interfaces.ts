export interface User {
  name?: string;
  surname?: string;
  email?: string;
  gender?: string;
  password?: string;
  confirmedPassword?: string;
  role?: string;
  id?: string | number;
  createdAt?: Date;
}

export interface Post {
  title?: string;
  description?: string;
  image_url?: string;
  date?: Date;
  authorId?: string | number;
  authorName?: string;
  id?: number | string;
}

export interface UserRegError {
  password?: string[] | null;
  passwordIsTheSame?: boolean;
}

export interface Month {
  name?: string;
  number?: number;
}

export interface ChartUserData {
  name?: string;
  users?: number;
}

export interface ChartPostData {
  name?: string;
  posts?: number;
}
