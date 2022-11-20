import { useEffect, useState } from "react";
import "./signup.css";
const SignUpForm  = () => {
    const [email,setEmail] = useState("");
    const [name,setName] = useState("");
    const [phone,setPhone] = useState("");
    const [password,setPassword] = useState("");
    const [confirmedPassword,setConfirmedPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault(); //Ngăn form re-load lại trang khi submit
        const newUser = {
            email: email,
            name : name,
            phone: phone,
            password: password
        }; //Lưu thông tin user
       // console.log(newUser);
    };
    useEffect(() => {
        if (name.length < 4) {
            console.log("name is too short");
        }
    }, [name])

    return (
       <section>
        <form className="infoform" onSubmit={handleSubmit}>
            <label> Your name</label>
            <input 
             type="text"
             id="name" 
             name="name" 
             onChange={(e) => setName(e.target.value)} //onChange khi nhập gì vào input thì nó sẽ bỏ những gì mình nhập vào name state
             placeholder="Enter your name">
             </input>

             <label> Email address</label>
            <input 
             type="email"
             id="email" 
             name="email" 
             onChange={(e) => setEmail(e.target.value)}
             placeholder="Enter your email">
             </input>

             <label> Password</label>
            <input 
             type="text"
             id="password" 
             name="pasword" 
             onChange={(e) => setPassword(e.target.value)}
             placeholder="Enter your password">
             </input>

             <label> Confirm Password</label>
            <input 
             type="text"
             id="confirmedpassword" 
             name="confirmedpasword" 
             onChange={(e) => setConfirmedPassword(e.target.value)}
             placeholder="Enter your password">
             </input>

             <label> Phone number</label>
            <input 
             type="text"
             id="phone" 
             name="phone" 
             onChange={(e) => setPhone(e.target.value)}
             placeholder="Enter your phone number">
             </input>
            
            <button type="submit">Continue</button>
        </form>
       </section>
    );
}
export default SignUpForm;