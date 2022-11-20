import React from "react";
import {Container} from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useMutation } from 'react-query';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Register() {
    const navigate = useNavigate();  
    let user = {};

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
        user = data;
        mutate();
    };

    const { isLoading, isError, error, mutate } = useMutation(
        postData, 
        {
            onSuccess: (res) => {
                navigate("/login");
            },
            onError: (err) => {                   
            },
        }
    );
    async function postData() {
        return await axios.post(process.env.REACT_APP_API_URL + 'register', user);
    }

    if (isLoading) {
        return <div>Loading...</div>
    }
    if (isError) {
        return <div>Error! {error.message}</div>
    }

    return (
        <Container fluid>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="heading">Đăng ký</h3>
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
                </div>
                <button type="submit" className="btn btn-outline-primary mb-2 mt-5">Đăng ký</button>
            </form>
        </Container>
    );
}

export default Register;