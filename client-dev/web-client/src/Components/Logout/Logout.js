import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

class Logout extends Component {
    constructor() {
        super()
        localStorage.setItem('sessionToken', '')
    }

    render () {
        return (
            <div>
                <Redirect to='/'></Redirect>
            </div>
        )
    }
}

export default Logout