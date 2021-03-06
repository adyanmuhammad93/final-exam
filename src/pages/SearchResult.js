import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

// Intersection Observer API
import useIntersectionObserver from '../hooks/useIntersectionObserver';

const SearchResult = () => {
  // Search Params
  const { query, range } = useParams();

  // Infinite Scroll
  const [array, setArray] = useState([]);
  const [newArray, setNewArray] = useState([
    {
      id: 'f76dcfa7-b9f3-489a-a372-8baf9c01abfd',
      name: 'Emilie Cartwright',
      username: 'Jaime_Bahringer',
      avater: 'https://cdn.fakercloud.com/avatars/bu7921_128.jpg',
      isFollowing: false,
    },
  ]);
  const [limit, setLimit] = useState(0);
  const [newLimit, setNewLimit] = useState(limit + 1);

  useEffect(() => {
    setTimeout(() => {
      fetch(
        `https://avl-frontend-exam.herokuapp.com/api/users/all?page=1&pageSize=${range}&keyword=${query}`
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setArray(data.data);
          console.log(data);
        });
    }, 1500);
  }, []);

  const [isVisible, setVisibility] = useState(false);
  const { objectRef } = useIntersectionObserver((entries) => {
    const [entry] = entries;
    if (entry.isIntersecting && limit < array.length) {
      setVisibility(entry.isIntersecting);
      setTimeout(() => {
        setLimit(limit + 1);
        setNewLimit(limit + 2);
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
      <div className="Content">
        {/* Page Title */}
        <h2 className="w-100 p-3">
          <small className="d-none d-lg-inline-block">
            <Link to="/">
              <i className="bi-arrow-left-short me-3"></i>
            </Link>
          </small>
          Results
        </h2>

        {/* Results List */}
        <div className="row row-cols-1 row-cols-xl-3 w-100 g-4 mb-4">
          {newArray.length > 1 &&
            newArray.slice(1, newLimit).map((data, index) => {
              return (
                <div className="col" key={index}>
                  <img
                    src={`https://picsum.photos/id/${index + 110}/400/225`}
                    className="img-fluid ratio ratio-16x9 mb-2"
                    alt=""
                  />
                  <h6 className="mb-0 text-capitalize">
                    {data.name} <br />
                    <small className="text-muted">by {data.username}</small>
                  </h6>
                </div>
              );
            })}

          <div className="col" ref={objectRef}></div>

          {isVisible && (
            <div className="col placeholder-glow">
              <img className="img-placeholder mb-2 placeholder w-100" alt="" />
              <h6 className="mb-0 text-capitalize">
                <span className="placeholder w-100"></span>
                <br />
                <span className="placeholder placeholder-sm w-50"></span>
              </h6>
            </div>
          )}

          {loading &&
            numbers.map((index) => {
              return (
                <div className="col placeholder-glow" key={index}>
                  <img
                    className="img-placeholder mb-2 placeholder w-100"
                    alt=""
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
