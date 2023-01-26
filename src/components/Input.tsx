import React from 'react'
import styles from "./Input.module.scss"
export default function Input() {
  return (
    <div className={ styles.container}>
      <input className={styles.input} placeholder='Cari berdasarkan komoditas'/>
    </div>
  )
}
