import React, { Component } from 'react'

class Home extends Component {
    constructor () {
        super()
        this.state = {
            loggedIn: false,
            email: null,
            error: null,
            isLoaded: false
        }
    }

    getLogin = async () => {
        try {
            let sessionToken = localStorage.getItem('sessionToken')
            if(sessionToken != ''){
                console.log('sess', sessionToken)
                let fetchResult = await fetch('http://localhost:3000/api/v1/users/checklogin', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                        "sessionToken": sessionToken
                    }
                })

                let jsonResult = await fetchResult.json()

                console.log('email', jsonResult.useremail)

                this.setState({
                    loggedIn: true,
                    email: jsonResult.useremail,
                    isLoaded: true
                })
            }
            
        } catch (e) {
            console.log(e)
        }
        
        
    }

    renderLogin = () => {
        if(this.state.loggedIn == true){
            return (
                <div>Welcome, {this.state.email}</div>
            )
        }
    }

    componentWillMount = async () => {
        await this.getLogin()
    }

    componentDidMount = async () => {
        
        let x = await this.getLogin()
        console.log(x)
    }

    render () {
        if (this.state.error){
            return <div>Error</div>
        } else if (!this.state.isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    Home {this.renderLogin()}
                </div>
            )
        }
    }
}

export default Home