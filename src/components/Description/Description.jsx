import React from 'react'
import {Card, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui'

function photoLink (country) {
  return `images/${country}_foto.jpg`
}

function Description (props) {
  const {country, data} = props
  return (
    <Card>
      <CardMedia overlay={<CardTitle title={country}/>}>
        <img src={photoLink(country)}/>
      </CardMedia>
      <CardText>
        <p>{data.reason}</p>
        <blockquote>
          <p>{data.story}</p>
        </blockquote>
      </CardText>
    </Card>
  )
}

export default Description
