import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => ({
    toggleVisibility
  }))

  const { buttonLabelOpen, buttonLabelClose, children } = props

  return (
    <div>
      {!visible && (
        <button onClick={toggleVisibility}>{buttonLabelOpen}</button>
      )}
      {visible && (
        <div>
          {children}
          <button onClick={toggleVisibility}>{buttonLabelClose}</button>
        </div>
      )}
    </div>
  )
})

Togglable.propTypes = {
  buttonLabelOpen: PropTypes.string.isRequired,
  buttonLabelClose: PropTypes.string.isRequired,
  children: PropTypes.node
}

Togglable.displayName = 'Togglable'

export default Togglable
