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
    
    componentDidMount () {
        this.loadData()
        this.formatData()
    }

    componentDidMount() {
        fetch('http://localhost:3000/api/v1/users/')
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    items: result,
                    isLoaded: true
                });
                this.formatData()
            },
            (error) => {
                this.setState({
                    isLoaded: true,
                    error: error
                })
            }
        )
    }

    componentWillReceiveProps () {
        this.loadData()
        this.formatData()
    }

    formatData() {
        
        let list = this.state.items.map(item => {
            <p>{item}</p>
        })

        console.log('list', list)

        return (
            <div>{list}</div>
        )
    }
    
    render () {
        const { error, isLoaded, items } = this.state;
        console.log('render', this.state)
        if (error){
            return <div>Error: {error.message}</div>
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