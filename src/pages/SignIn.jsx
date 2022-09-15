import React from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button'

const SignIn = () => {
    return (
        <Container className='text-center'>
            <Form>
              <img src='./assets/icon-left-font.png' alt='logo groupomania' /> 
              <h1>Connexion</h1> 
            </Form>
            <Form.Group controlId='sign-in-email-adress'>
                <Form.Control type='email' size='lg' placeholder='Adresse mail' autoComplete='username'/>
            </Form.Group>
            <Form.Group controlId='sign-in-password'>
                <Form.Control type='password' size='lg' placeholder='Mot de passe' autoComplete='current-password'/>
            </Form.Group>
            <Button variant='primary' size='lg'>Connexion</Button>
        </Container>
    );
};

export default SignIn;