import React from 'react'

import {Paper} from 'material-ui'

function Link (props) {
  const {onClick} = props
  const clickHandler = event => {
    event.preventDefault()
    onClick()
  }
  return (
    <a
      href="javascript:void(0)"
      onClick={onClick}
      className="Intro-link"
    >
      {props.children}
    </a>
  )
}

export default function Intro (props) {
  const {onFilterClick} = props
  const filter = (...filters) => {
    return () => onFilterClick(filters)
  }
  return (
    <div className="Intro">
      <Paper className="Intro-block">
        <p>
          Do you think you can solve the crisis by <Link onClick=
          {filter('Syria')}>stopping the migrants from
          Syria</Link>?
          <br/>
          That would not be enough. Only 28 % of the total number of migrants come from Syria.
        </p>
      </Paper>

      <Paper className="Intro-block">
        <p>
          Do you think you can solve the problem by <Link onClick={filter('War', 'Terrorism')}>
            stopping all war conflicts and terrorist acts in the given countries</Link>?
          <br/>
          There are still other factors influencing the migration left.
        </p>
      </Paper>

      <Paper className="Intro-block">
        <p>
          Do you think the most migrants{' '}
          <Link onClick={filter('Eritrea', 'Mali', 'Gambia', 'Nigeria', 'Somalia')}>come from African countries</Link>?
          <br/>
          88% of total number of migrants come from Asia or Europe itself.
        </p>
      </Paper>
    </div>
  )
// valka, terror

// Eritrea, Mali, Gambia, Nigeria, Somalia
}
