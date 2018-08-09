import React, { PureComponent } from 'react'

import styles from './loading.scss'

class Loading extends PureComponent {
  render() {
    return (
      <div className={styles.wrapper}>
        Loading...
      </div>
    )
  }
}

export default Loading
