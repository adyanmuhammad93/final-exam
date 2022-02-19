import React, { useEffect, useState } from 'react';
// Intersection Observer API
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

const FollowList = () => {
  // Infinite Scroll
  const [array, setArray] = useState([]);
  const [newArray, setNewArray] = useState([
    {
      id: '1c302f65-b6a1-4f31-ad6b-903685d3b4f9',
      name: "Antonia O'Connell",
      username: 'Stella44',
      avater: 'https://cdn.fakercloud.com/avatars/uxalex_128.jpg',
      isFollowing: true,
    },
  ]);
  const [limit, setLimit] = useState(0);
  const [newLimit, setNewLimit] = useState(limit + 1);

  const [followers, setFollowers] = useState(null);
  const [following, setFollowing] = useState(null);

  const [loading, setLoading] = useState(true);
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  useEffect(() => {
    setTimeout(() => {
      fetch(
        'https://avl-frontend-exam.herokuapp.com/api/users/all?page=1&pageSize=50'
      )
        .then((response) => response.json())
        .then((data) => {
          setLoading(false);
          setArray(data.data);
          console.log(data);
        });
    }, 1500);
  }, []);

  useEffect(() => {
    setTimeout(async () => {
      const resp = await fetch(
        'https://avl-frontend-exam.herokuapp.com/api/users/friends?page=1&pageSize=50'
      );
      const json = await resp.json();
      setLoading(false);
      setFollowing(json);
      console.log(json.data);
    }, 5000);
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

  return (
    <>
      <nav className="py-3">
        <div
          className="nav nav-tabs nav-fill border-0"
          id="nav-tab"
          role="tablist"
        >
          <button
            className="nav-link active"
            id="nav-home-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-home"
            type="button"
            role="tab"
            aria-controls="nav-home"
            aria-selected="true"
          >
            Followers
          </button>
          <button
            className="nav-link"
            id="nav-profile-tab"
            data-bs-toggle="tab"
            data-bs-target="#nav-profile"
            type="button"
            role="tab"
            aria-controls="nav-profile"
            aria-selected="false"
          >
            Following
          </button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div
          className="tab-pane fade p-3 show active"
          id="nav-home"
          role="tabpanel"
          aria-labelledby="nav-home-tab"
        >
          {newArray.length > 1 &&
            newArray.slice(1, newLimit).map((data) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center mb-3"
                  key={data.id}
                >
                  <div className="d-flex">
                    <img
                      src={data.avater}
                      alt=""
                      className="img-fluid me-3 rounded border border-white"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <h6 className="mb-0">
                      {data.name} <br />
                      <small className="text-muted text-lowercase">
                        @{data.username}
                      </small>
                    </h6>
                  </div>
                  {data.isFollowing === true ? (
                    <button className="btn btn-sm btn-outline rounded-pill active">
                      Following
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-outline rounded-pill">
                      Follow
                    </button>
                  )}
                </div>
              );
            })}

          
          <div className="d-flex" ref={objectRef}></div>

          {isVisible && (
            <div
              className="d-flex justify-content-between align-items-center mb-3 placeholder-glow"
            >
              <div className="d-flex">
                <img
                  className="me-3 rounded placeholder"
                  style={{ width: '40px', height: '40px' }}
                />
                <h6 className="mb-0" style={{ minWidth: '150px' }}>
                  <span className="placeholder w-100"></span>
                  <br />
                  <span className="placeholder placeholder-sm w-50"></span>
                </h6>
              </div>
              <button className="btn btn-sm btn-outline active rounded-pill placeholder w-25"></button>
            </div>

            // <div className="d-flex justify-content-center">
            //   <span className="spinner-border"></span>
            // </div>
          )}

          {loading &&
            numbers.map((index) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center mb-3 placeholder-glow"
                  key={index}
                >
                  <div className="d-flex">
                    <img
                      className="me-3 rounded placeholder"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <h6 className="mb-0" style={{ minWidth: '150px' }}>
                      <span className="placeholder w-100"></span>
                      <br />
                      <span className="placeholder placeholder-sm w-50"></span>
                    </h6>
                  </div>
                  <button className="btn btn-sm btn-outline active rounded-pill placeholder w-25"></button>
                </div>
              );
            })}
        </div>
        <div
          className="tab-pane fade p-3"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          {following &&
            following.data.map((user) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center mb-3"
                  key={user.id}
                >
                  <div className="d-flex">
                    <img
                      src={user.avater}
                      alt=""
                      className="img-fluid me-3 rounded border border-white"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <h6 className="mb-0">
                      {user.name} <br />
                      <small className="text-muted text-lowercase">
                        @{user.username}
                      </small>
                    </h6>
                  </div>
                  {user.isFollowing === true ? (
                    <button className="btn btn-sm btn-outline rounded-pill active">
                      Following
                    </button>
                  ) : (
                    <button className="btn btn-sm btn-outline rounded-pill">
                      Follow
                    </button>
                  )}
                </div>
              );
            })}
          {loading &&
            numbers.map((index) => {
              return (
                <div
                  className="d-flex justify-content-between align-items-center mb-3 placeholder-glow"
                  key={index}
                >
                  <div className="d-flex">
                    <img
                      className="me-3 rounded placeholder"
                      style={{ width: '40px', height: '40px' }}
                    />
                    <h6 className="mb-0" style={{ minWidth: '150px' }}>
                      <span className="placeholder w-100"></span>
                      <br />
                      <span className="placeholder placeholder-sm w-50"></span>
                    </h6>
                  </div>
                  <button className="btn btn-sm btn-outline active rounded-pill placeholder w-25"></button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

export default FollowList;
