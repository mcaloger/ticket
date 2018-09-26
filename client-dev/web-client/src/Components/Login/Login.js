import React, { Component } from 'react'

import { Redirect } from 'react-router-dom'

class Login extends Component {

    constructor() {
        super()
        this.state = {
            attempted: false,
            successful: null,
            error: null
        }
    }

    handleLogin = async () => {
        let email = document.getElementById('email').value
        let password = document.getElementById('password').value

        let result = await fetch('http://localhost:3000/api/v1/users/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json; charset=utf-8",

            },
            body: JSON.stringify({
                message: "hello",
                email: email,
                password: password
            })
        })
        
        let jsonResult = await result.json()

        if(jsonResult.error == null) {
            this.setState({
                attempted: true,
                successful: true
            })
            console.log('token', jsonResult.sessionToken)
            localStorage.setItem('sessionToken', jsonResult.sessionToken)
            alert(localStorage.getItem('sessionToken'))
        } else {
            this.setState({
                attempted: true,
                successful: false,
                error: jsonResult.error
            })
        }

        console.log(jsonResult)
    }

    redirectLoggedIn = () => {
        if(this.state.attempted == true){
            if(this.state.successful == true) {
                return (
                    <Redirect to="/success"></Redirect>
                )
            }
        }
    }

    render () {
        return (
            <div>
                <p>Email</p>
                <input id="email" type="text"></input>
                <p>Password</p>
                <input id="password" type="password"></input>
                <p>
                <button onClick={this.handleLogin}>Submit</button>
                </p>
                

                <div>{this.state.error}</div>

                {this.redirectLoggedIn()}
            </div>
        )
    }
}

export default Login