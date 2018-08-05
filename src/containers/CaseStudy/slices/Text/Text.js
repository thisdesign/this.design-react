import { RichText } from 'prismic-reactjs';
import React from 'react';
import './Text.css';

const Text = props => <div className="grid"><div className="casestudy__text">{RichText.render(props.data.value)}</div></div>;

export default Text;
