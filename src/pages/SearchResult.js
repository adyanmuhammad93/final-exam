import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Intersection Observer API
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const SearchResult = () => {
  // Search Params
  const { query, range } = useParams();

  // Infinite Scroll
  var i = 0;
  const [array, setArray] = useState([]);
  const [newArray, setNewArray] = useState([]);

  useEffect(async () => {
    setTimeout(async () => {
      const resp = await fetch(
        `https://api.unsplash.com/search/collections?query=${query}&per_page=${range}&client_id=U-rUir27xXKsXtMIFGZ0TcQ4DTFAsfUC14OdqJCArmw`
      );
      const json = await resp.json();
      setLoading(false);
      setArray(json.results);
      console.log(json.results);
    }, 3000);
  }, []);

  const [isVisible, setVisibility] = useState(false);
  const { objectRef } = useIntersectionObserver((entries) => {
    const [entry] = entries;
    while (i < array.length) {
      if (entry.isIntersecting) {
        setVisibility(entry.isIntersecting);
        // setTimeout(() => {
        //   setNewArray([...newArray, array[i]]);
        //   console.log(array[i]);
        //   i++;
        // }, 500);
      } else {
        setVisibility(false);
        setHasMore(false);
      }
    }
  });

  // Skeleton Loading
  const [loading, setLoading] = useState(true);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <>
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
          {newArray &&
            newArray.map((data, index) => {
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
            })
            (
              <span className="spinner-border"></span>
            )
            }
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
