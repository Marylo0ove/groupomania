import React from 'react';
import axios from 'axios';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState('false');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const handleSignUp = async (e) => {
        e.preventDefault();
        const emailError = document.querySelector('.email.error');
        const passwordError = document.querySelector('.password.error');

        await axios({
            method: "post",
            url: `${process.env.REACT_APP_API_URL}api/auth/signup`,
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
                setFormSubmit(true);
            }
        })
        .catch((err) => {
            console.log(err);
        })
    };
        
    return (
        <>
        {formSubmit ? (
            <>
            <SignInForm/>
            <span></span>
            <h4 className='success'> Votre compte a bien été créé! Merci de vous connecter pour accéder au réseau social de Groupomania. </h4>
            </>
        ) : (

        <Container className='flex-column d-flex justify-content-center text-center col-10'>
            <img src={imgLogo} alt='logo groupomania' className='signin_logo' /> 
              <h1>Créer mon compte</h1> 
              <Form onSubmit={handleSignUp}> 
            <Form.Group controlId='sign-in-email-adress' className='signin_form'>
                <Form.Control type='email' size='lg' placeholder='Adresse mail' autoComplete='username' onChange={(e) => setEmail(e.target.value)} value={email}/>
            </Form.Group>
            <div className='email error'></div>
            <Form.Group controlId='sign-in-password' className='signin_form'>
                <Form.Control type='password' size='lg' placeholder='Je choisis mon mot de passe' onChange={(e) => setPassword(e.target.value)} value={password}/>
            </Form.Group>
            <div className='password error'></div>
            <Button type='submit' value='Submit' variant='danger' size='lg' className='d-grid gap-2 mx-auto'>Créer mon compte</Button>
            </Form>
            <NavLink to="/">
                <p>Déjà inscrit ?</p>
            </NavLink>
        </Container>
        )}
        </>
    );
};

export default SignUpForm;