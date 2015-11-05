import React from 'react'

const Container = React.createClass({
  render: function () {
    const features = this.props.features.map(feature => {
      return (<li><a href={feature.url}>{feature.name}</a></li>)
    })
    return (
      <div className="main">
        <div className="welcomeMsg">
          Congratulations, you now have a working react.js application.
        </div>
        Features include:
        <ul className="featureList">
          {features}
        </ul>
      </div>
    )
  },
})

export default Container
