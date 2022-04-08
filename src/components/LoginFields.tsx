import { Input } from "./Input"

import "../styles/LoginFields.scss";

export const LoginFields = () => {
    return(
        <div className="login-fields">
            <Input type="email" placeholder="Email"/>
            <Input type="password" placeholder="Password"/>
        </div>
    )
}