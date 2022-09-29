import React from 'react';
import '../styles/index.scss';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import imgLogo from '../assets/icon-left-font.png';

const SignUp = () => {
    return (
        <Container className='flex-column d-flex justify-content-center text-center col-10'>
            <img src={imgLogo} alt='logo groupomania' className='signin_logo' /> 
              <h1>Créer mon compte</h1> 
              <Form> 
            <Form.Group controlId='sign-in-email-adress' className='signin_form'>
                <Form.Control type='email' size='lg' placeholder='Adresse mail' autoComplete='username'/>
            </Form.Group>
            <Form.Group controlId='sign-in-password' className='signin_form'>
                <Form.Control type='password' size='lg' placeholder='Je choisis mon mot de passe'/>
            </Form.Group>
            <Button type='submit' value='Submit' variant='danger' size='lg' className='d-grid gap-2 mx-auto'>Créer mon compte</Button>
            </Form>
            <NavLink to="/">
                <p>Déjà inscrit ?</p>
            </NavLink>
        </Container>
    );
};

export default SignUp;