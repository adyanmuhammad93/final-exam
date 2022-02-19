import React, { useState, useEffect } from 'react';
import FollowList from "../follow/FollowList.js";

const Follow = () => {
  // 
  const [newArray, setNewArray] = useState([])

  // API Connections
  const apiURL = 'https://api.unsplash.com/search/collections?query';
  const apiKey = 'U-rUir27xXKsXtMIFGZ0TcQ4DTFAsfUC14OdqJCArmw';

  useEffect(() => {
    setTimeout(() => {
      fetch(`${apiURL}=snow&per_page=1&client_id=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setNewArray(data.results)
        })
    }, 1500);
  }, []);

  return (
    <>
      <div className="Follow"><FollowList newArray={newArray}/></div>
    </>
  );
};

export default Follow;
 