import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Auth from '@aws-amplify/auth';
import Storage from '@aws-amplify/storage';

//import { withAuthenticator } from 'aws-amplify-react'
//import { Storage } from 'aws-amplify'

class App extends Component {
	state = { fileUrl: '', file: '', filename: '' }
	handleChange = e => {
		const file = e.target.files[0]
		this.setState({
			fileUrl: URL.createObjectURL(file),
			file,
			filename: file.name
		})
	}
	saveFile = () => {
		Storage.put(this.state.filename, this.state.file).then( () => {
			console.log('saved file.')
			this.setState({ fileUrl: '', file: '', filename: '' })
	})
		.catch(err => {
			console.log('error uploading file.', err)
		})
}
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
	    <input type='file' onChange={this.handleChange} />
	    <img src={this.state.fileUrl} />
	    <button onClick={this.saveFile}>Save ya ting</button>
      </div>
    );
  }
}

export default App;
