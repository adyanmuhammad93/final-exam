import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Intersection Observer API
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const SearchResult = (props) => {
  // Search Params
  const { query, range } = useParams();

  // Infinite Scroll
  const [array, setArray] = useState([]);
  const [newArray, setNewArray] = useState([props.newArray]);
  const [limit, setLimit] = useState(0)
  const [newLimit, setNewLimit] = useState(limit + 1)

  // API Connections
  const apiURL = 'https://api.unsplash.com/search/collections?query';
  const apiKey = 'U-rUir27xXKsXtMIFGZ0TcQ4DTFAsfUC14OdqJCArmw';

  useEffect(() => {
    setTimeout(() => {
      fetch(`${apiURL}=${query}&per_page=${range}&client_id=${apiKey}`)
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setArray(data.results);
          console.log(data.results);
        });
    }, 1500);
  }, []);

  const [isVisible, setVisibility] = useState(false);
  const { objectRef } = useIntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && (limit < array.length)) {
      setVisibility(entry.isIntersecting);
      setTimeout(() => {
        setLimit(limit + 1)
        setNewLimit(limit + )
        setNewArray([...newArray, array[limit]]);
        console.log(array[limit]);
      }, 500);
    } else {
      setVisibility(false);
    }
  });

  // Skeleton Loading
  const [loading, setLoading] = useState(true);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
      {isVisible && (
        <div className="position-fixed top-50">
          <span className="spinner-border"></span>
        </div>
      )}
      <div className="Content">
        {/* Page Title */}
        <h2 className="w-100 p-3">
          <small className="d-none d-lg-inline-block">
            <Link to="/">
              <i className="bi-arrow-left-short me-3"></i>
            </Link>
          </small>
          Results for {query} in {range}
        </h2>

        {/* Results List */}
        <div className="row row-cols-1 row-cols-xl-3 w-100 g-4 mb-4">
          {newArray.length > 1 &&
            newArray.slice(1, newLimit).map((data, index) => {
              return (
                <div className="col" key={index}>
                  <img
                    src={data.cover_photo.urls.small}
                    className="img-fluid mb-2"
                    alt=""
                    style={{ height: '150px' }}
                  />
                  <h6 className="mb-0 text-capitalize">
                    {data.alt_description} <br />
                    <small className="text-muted">by {data.user.name}</small>
                  </h6>
                </div>
              );
            })}
          {loading &&
            numbers.map((index) => {
              return (
                <div className="col placeholder-glow" key={index}>
                  <img
                    // src={data.cover_photo.urls.small}
                    className="img-fluid rounded mb-2 placeholder w-100"
                    alt=""
                    style={{ height: '150px' }}
                  />
                  <h6 className="mb-0 text-capitalize">
                    <span className="placeholder w-100"></span>
                    <br />
                    <span className="placeholder placeholder-sm w-50"></span>
                  </h6>
                </div>
              );
            })}
        </div>
        <div className="row">
          <div className="col p-5" ref={objectRef}></div>
        </div>
      </div>
      <div className="MobileNav MobileNav--On-Top">
        <h2 className="w-100 p-3">
          <small>
            <Link to="/">
              <i className="bi-arrow-left-short me-3"></i>
            </Link>
          </small>
          Home Page
        </h2>
      </div>
    </>
  );
};

export default SearchResult;
