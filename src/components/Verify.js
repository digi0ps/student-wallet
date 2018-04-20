import React from 'react'

class Verify extends React.Component {
    state = {
        phone: "",
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }

    render() {
        return (
            <div>
                <div>
                    <label>Phone: </label>
                    <input type="text" name="name" value={this.state.phone} onChange={this.handleChange} />
                </div>
            </div>
        )
    }
}

export default Verify