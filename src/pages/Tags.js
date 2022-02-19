import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Tags = () => {
  const [tags, setTags] = useState([]);
  // Skeleton Loading
  const [loading, setLoading] = useState(true);

  // Skeleton Loading
  const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // Skeleton Loading
  useEffect(() => {
    setTimeout(async () => {
      const resp = await fetch(
        'https://avl-frontend-exam.herokuapp.com/api/tags'
      );
      const json = await resp.json();
      setLoading(false);
      setTags(json);
      console.log(json.data);
    }, 5000);
  }, []);
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
          Tags
        </h2>

        {/* Tags List */}
        <div className="row row-cols-2 row-cols-xl-5 w-100 g-4 mb-4">
          {tags &&
            tags.map((tag) => {
              return (
                <div className="col" key={tag.id}>
                  <div className="Tags">
                    <img className="Tags__Image img-fluid" />
                    <h4 className="Tags__Badge">
                      <span className="badge text-truncate">
                        <span className="text-capitalize">{tag.name}</span>
                      </span>
                    </h4>
                  </div>
                  <h6 className="mb-0">
                    <span className="text-capitalize">{tag.name}</span> <br />
                    <small style={{ color: '#B2B2B2' }}>
                      {tag.count} results
                    </small>
                  </h6>
                </div>
              );
            })}

          {loading &&
            numbers.map((index) => {
              return (
                <div className="col placeholder-glow" key={index}>
                  <div className="Tags">
                    <img className="Tags__Image Tags__Image--Loading img-fluid placeholder" />
                  </div>
                  <h6 className="mb-0">
                    <span className="placeholder w-100"></span>
                    <br />
                    <span className="placeholder placeholder-sm w-50"></span>
                  </h6>
                </div>
              );
            })}
        </div>

        {/* {!loading && (
          <div className="row g-4 w-100">
            <div className="col-12">
              <button className="btn btn-primary">Load More</button>
            </div>
          </div>
        )} */}
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

export default Tags;
