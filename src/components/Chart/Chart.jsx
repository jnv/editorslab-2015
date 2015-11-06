import React from 'react'
import {Paper} from 'material-ui'

function displayPercent (value) {
  return Math.round(value)
}

function Chart (props) {
  const {current, total} = props

  const ratio = current / total
  const percentage = 100 * ratio

  const classMod = (ratio <= 0.5) ? 'is-ok' : ''

  return (
    <Paper zDepth={2}>
      <div className="Chart">
        <span className={`Chart-fill ${classMod}`} style={{width: `${percentage}%`}}>
          <span className="Chart-percentDesc">
            {`${current} (${displayPercent(percentage)}%)`}
          </span>
          <div className="Chart-mark" />
        </span>
      </div>
    </Paper>
  )
}

export default Chart
