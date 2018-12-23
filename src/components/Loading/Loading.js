import React from 'react';
import './Loading.scss';

export default function Loading() {
  return (
    <div className="loader">
      <img
        className="loader__icon"
        src="https://prismic-io.s3.amazonaws.com/thisstaging%2F802faa64-bf5a-4db5-9d56-47f802a0980c_thisloader.gif"
        alt="loading"
      />
    </div>
  );
}
