export interface FormProps {
  formHeader?: {
    title?: string;
    question?: string;
    location?: string;
    linkText?: string;
  };

  formBottom: {
    submitBtnText?: string;
    disabledBtn?: boolean;
  };
}

export interface UserProperties {
  name?: string;
  surname?: string;
  email?: string;
  gender?: string;
  password?: string;
}
