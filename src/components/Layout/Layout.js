import React from 'react';
//import { Link } from 'react-router';
//import { LoginLink } from 'react-stormpath';
import DocumentTitle from 'react-document-title';
import Header from '../Header/Header';

export default class is extends React.Component {
    render() {
      return (
          <div className='Layout'>
            <Header />
            { this.props.children }
          </div>
      );
    }
  }