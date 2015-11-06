import React from 'react'
import {Paper} from 'material-ui'


function displayPercent(value) {
  return Math.round(value)
}

function Chart (props) {
  const {current, total} = props

  const ratio = current / total
  const percentage = 100 * ratio

  return (
    <Paper zDepth={1}>
      <div className="Chart">
        <span className="Chart-fill" style={{width: `${percentage}%`}}>
          <span className="Chart-percentDesc">
            {`${current} (${displayPercent(percentage)}%)`}
          </span>
        </span>
      </div>
    </Paper>
  )
}

export default Chart