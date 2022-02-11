import React, { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (callbackFunction) => {
  
  const objectRef = useRef(null);
  const options = {
    root: null,
    rootMaMargin: '0px',
    threshold: 1.0,
  };
  useEffect(() => {
    const observer = new IntersectionObserver(callbackFunction, options);
    if (objectRef.current) {
      observer.observe(objectRef.current);
    }
    return () => {
      if (objectRef.current) {
        observer.unobserve(objectRef.current);
      }
    };
  }, [objectRef.current, options]);
  return {
    objectRef
  };
};

export default useIntersectionObserver;
