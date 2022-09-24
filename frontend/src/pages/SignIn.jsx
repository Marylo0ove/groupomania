import React, { useState } from 'react';
import Axios from 'axios';
import '../styles/index.scss';
import { NavLink, useActionData } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import imgLogo from '../assets/icon-left-font.svg';



const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        Axios({
            method:'post',
            url: `${process.env.REACT_APP_API_URL}api/auth/login`,
            withCredentials: true,
            data:{
                email,
                password,
            },
        })
        .then((res) => {
            console.log(res);
            if(res.data.errors){
                emailError.innerHTML = res.data.errors.email;
                passwordError.innerHTML = res.data.errors.password;
            } else{
                window.location = '/Home';
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };

    return (
        <Container className='flex-column d-flex justify-content-center col-10'>
            <img src={imgLogo} alt='logo groupomania'/> 
            <Form>
              <h1>Connexion</h1> 
            </Form>
            <Form.Group controlId='sign-in-email-adress' className='signin_form' onSubmit={handleLogin}>
                <Form.Control type='email' size='lg' placeholder='Adresse mail' autoComplete='username' onChange={(e) => setEmail (e.target.value)} value={email}/>
                <div className="email-error"></div>
            </Form.Group>
            <Form.Group controlId='sign-in-password' className='signin_form'>
                <Form.Control type='password' size='lg' placeholder='Mot de passe' autoComplete='current-password' onChange={(e) => setPassword (e.target.value)} value={password}/>
                <div className="password-error"></div>
            </Form.Group>
            <Button type='submit' value='Submit' variant='danger' size='lg' className='d-grid gap-2 mx-auto'>Connexion</Button>
            <NavLink to="/SignUp">
                <p>Permière connexion ?</p>
            </NavLink>
        </Container>
    );
};

export default SignIn;