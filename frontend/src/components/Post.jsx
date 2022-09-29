import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Posts = () => {
    const[data, setData] = useState([]);

useEffect(() => {
    axios.get(`http://localhsot:8000/api/posts`)
    .then((res) => setData(res.data));
}, [])

    return (
        <div >
            Post
        </div>
    );
};

export default Posts;