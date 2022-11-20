import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();                             // dùng react-router-dom
    let user = {};

    const { register, handleSubmit } = useForm();               // dùng react-form-hook
    const onSubmit = data => {   // 2
        user = data;
        mutate();       // 3
    };

    const { isLoading, isError, error, mutate } = useMutation(          // dùng react-query
        postDataLogin,  // 4
        {
            onSuccess: (res) => {      // 6
                if (res.data.ReturnCode === 1) {
                    localStorage.setItem("authenticated", true);              
                    navigate("/");              // 7
                } else {
                    window.alert(res.data.Message);
                    localStorage.setItem("authenticated", false);
                }               
            },
            onError: (err) => {

            },
        }
    );

    async function postDataLogin() {
        return await axios.post(process.env.REACT_APP_API_URL + 'login', user);   // 5 goij api đến BE kèm data để xử lý
    }
    
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! {error.message}</div>
    }

    // 1
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="heading">Đăng nhập</h3>
            <div>
                <div className="form-group row">
                    <label htmlFor="username" className="col-sm-4 col-form-label">Họ và tên:</label>
                    <div className="col-sm-8">
                        <input type="text" name="Username" id="username" className="form-control" placeholder="user123" {...register("Username")}/>
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="password" className="col-sm-4 col-form-label">Mật khẩu:</label>
                    <div className="col-sm-8">
                        <input type="password" name="Password" id="password" className="form-control" placeholder="****" {...register("Password")}/>
                    </div>
                </div>
                <div className="row d-flex justify-content-center">
                    <p>Chưa có tài khoản? <a href="/register"> Đăng ký ngay!</a></p>                 
                </div>                
            </div>
            <button type="submit" className="btn btn-outline-primary mb-2 mt-5">Đăng nhập</button>
        </form>
    );
}

export default Login;