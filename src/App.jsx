import React, { Component, } from "react"


class App extends Component {

  state = {
    text: "Hello World",
  }

  componentDidMount() {
    this.setState({
      text: "Loaded!",
    })
  }


  render() {
    return (
      <h1>{this.state.text}</h1>
    )
  }

}

export default App