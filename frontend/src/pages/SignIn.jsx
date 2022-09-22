import React from 'react';
import '../styles/index.scss';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import imgLogo from '../assets/icon-left-font.png';



const SignIn = () => {
    return (
        <Container className='text-center signin_container'>
            <Form>
              <img src={imgLogo} alt='logo groupomania' className='signin_logo' /> 
              <h1>Connexion</h1> 
            </Form>
            <Form.Group controlId='sign-in-email-adress' className='signin_form'>
                <Form.Control type='email' size='lg' placeholder='Adresse mail' autoComplete='username'/>
            </Form.Group>
            <Form.Group controlId='sign-in-password' className='signin_form'>
                <Form.Control type='password' size='lg' placeholder='Mot de passe' autoComplete='current-password'/>
            </Form.Group>
            <Button variant='primary' size='lg'>Connexion</Button>
            <NavLink to="/SignUp">
                <p>Permière connexion ?</p>
            </NavLink>
        </Container>
    );
};

export default SignIn;