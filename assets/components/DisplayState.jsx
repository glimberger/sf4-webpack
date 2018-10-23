import React from 'react'

export default (props) => {
  return (
    <div className="alert alert-primary small" role="alert">
      <pre className='mb-0'>{JSON.stringify(props.state, null, 2)}</pre>
    </div>
  )
}