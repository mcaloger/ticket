import React, { Component } from 'react'

class Groups extends Component {

    constructor (props) {
        super(props);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.state = {
            error: null,
            isLoaded: false,
            items: []
        };
      }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    items: result,
                    isLoaded: true
                });
            }
        )
        .catch(error => {
            this.setState({
                isLoaded: true, 
                error: "Error"
            })
        })
    }
    
    render () {
        const { error, isLoaded, items } = this.state;
        console.log('render', this.state)
        if (error){
            return <div>Error</div>
        } else if (!isLoaded) {
            return <div>Loading...</div>
        } else {
            return (
                <div>
                    Groups
                    <div>
                    {this.state.items.map(item => (
                        <div key={item.userid} className="dataFieldRow">
                            <p>{item.useremail}</p>
                        </div>
                    ))}
                    </div>
                    
                </div>
            )
        }
    }
}

export default Groups