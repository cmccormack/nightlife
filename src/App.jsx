import React, { Component, } from "react"


class App extends Component {

  state = {
    text: "Page not loaded...",
  }

  componentDidMount() {
    this.setState({
      text: "Page Loaded!",
    })
  }


  render() {
    return (
      <h1>{this.state.text}</h1>
    )
  }

}

export default App