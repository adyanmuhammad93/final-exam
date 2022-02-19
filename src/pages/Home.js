import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'

// Components
import MobileNav from '../components/navs/MobileNav';
import ExamSlider from '../components/forms/ExamSlider';
import TextField from '../components/forms/TextField';

const Home = () => {
  const [range, setRange] = useState(15);
  const [query, setQuery] = useState('')
  const navigate = useNavigate()
  function handleSubmit(e) {
    e.preventDefault()
    navigate(`/search/${query}/${range}`)
  }
  return (
    <>
      <div className="Content">
        

        {/* Page Title  */}
        <h2 className="w-100 p-3">Search</h2>

        {/* Forms */}
        <form onSubmit={handleSubmit} className="row flex-column g-4 w-100 h-100">

          <div className="col-12">
            <TextField
              query={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>

          <div className="col-12">
            <hr />
          </div>

          <div className="col-12">
            <h2># Of Results Per Page</h2>
            <h1 className="d-inline-block me-2">
              <strong>{range}</strong>
            </h1>{' '}
            results
          </div>

          <div className="col-12 flex-grow-1">
            <ExamSlider 
              range={range}
              onChange={(e) => setRange(e.target.value)}
            />
          </div>

          <div className="col-12">
            <hr />
          </div>

          <div className="col-12 col-md-4">
            <button type="submit" className="btn btn-contain w-100 text-uppercase fw-bold">
              Search
            </button>
          </div>

        </form>
      </div>
      <div className="MobileNav">
        <MobileNav />
      </div>
    </>
  );
};

export default Home;
