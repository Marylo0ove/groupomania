import React from 'react';
import Container from 'react-bootstrap/esm/Container';
import Header from '../components/Header';
import { NavLink, useActionData } from 'react-router-dom';
import Post from '../components/Post';
import Navigation from '../components/Navigation';


const Home = () => {
    return (
        <Container>
            
              <Header />

           
            <Post />
         
        </Container>
    );
};

export default Home;