import React, { Component } from 'react'
import axios from 'axios'
import { Route, Link, withRouter, Switch } from 'react-router-dom'
import './App.css'
import LoginForm from './components/Login/LoginForm'
import SignupForm from './components/SignupForm'
import Header from './components/Header'
import Home from './components/Home'
import AddMusic from './pages/AddMusic'
import Edits from './pages/Edits'
import NoMatch from './pages/NoMatch'

const DisplayLinks = props => {
	if (props.loggedIn) {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item" style={{color:"white"}}>
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="#" className="nav-link" onClick={props._logout}>
							Logout
						</Link>
					</li>
					<li className="nav-item"  style={{color:"white"}}>
						<Link to="/addMusic" className="nav-link">
							My Repertoire
						</Link>
					</li>
				</ul>
			</nav>
		)
	} else {
		return (
			<nav className="navbar">
				<ul className="nav">
					<li className="nav-item">
						<Link to="/" className="nav-link">
							Home
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/login" className="nav-link">
							login
						</Link>
					</li>
					<li className="nav-item">
						<Link to="/signup" className="nav-link">
							sign up
						</Link>
					</li>
				</ul>
			</nav>
		)
	}
}

class App extends Component {
	constructor() {
		super()
		this.state = {
			loggedIn: false,
			user: null
		}
		this._logout = this._logout.bind(this)
		this._login = this._login.bind(this)
	}
	componentDidMount() {
		axios.get('/auth/user').then(response => {
			console.log(response.data)
			if (!!response.data.user) {
				console.log('THERE IS A USER')
				this.setState({
					loggedIn: true,
					user: response.data.user
				})
			} else {
				this.setState({
					loggedIn: false,
					user: null
				})
			}
		})
	}

	_logout(event) {
		event.preventDefault()
		console.log('logging out')
		axios.post('/auth/logout').then(response => {
			console.log(response.data)
			if (response.status === 200) {
				this.setState({
					loggedIn: false,
					user: null
				})
				this.redirectToHome();
			}
		})
	}

	redirectToHome = () => {
		this.props.history.push("/");
	}

	_login(username, password) {
		axios
			.post('/auth/login', {
				username,
				password
			})
			.then(response => {
				console.log(response)
				if (response.status === 200) {
					// update the state
					this.setState({
						loggedIn: true,
						user: response.data.user
					})
				}
			})
	}

	render() {
		return (
			<div className="App">
				<div className="top">
				<Header user={this.state.user} />
				{/* LINKS to our different 'pages' */}
				<DisplayLinks _logout={this._logout} loggedIn={this.state.loggedIn} />
				</div>
				{/*  ROUTES */}
				{/* <Route exact path="/" component={Home} /> */}
				<Switch>
					<Route exact path="/" render={() => <Home user={this.state.user} />} />
					<Route
						exact
						path="/login"
						render={() =>
							<LoginForm
								_login={this._login}
								_googleSignin={this._googleSignin}
							/>}
					/>
					<Route exact path="/signup" component={SignupForm} />
					<Route exact path="/addMusic" component={AddMusic} />
					<Route strict path="/edits/:id" component={Edits} />
					<Route component={NoMatch}/>
				</Switch>
				{/* <LoginForm _login={this._login} /> */}
			</div>
		)
	}
}

export default withRouter(App);
