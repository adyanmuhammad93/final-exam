import React from 'react';
import Following from "./Following";
import Followers from "./Followers";

const FollowTab = () => {
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
          <Following />
        </div>
        <div
          className="tab-pane fade p-3"
          id="nav-profile"
          role="tabpanel"
          aria-labelledby="nav-profile-tab"
        >
          <Followers />
        </div>
      </div>
    </>
  );
};

export default FollowTab;
