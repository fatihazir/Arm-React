import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectUser,
  deleteUser,
  setUser
} from './userSlice';
import styles from './Counter.module.css';

export function Counter() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  console.log(user);


  return (
    <div style={{ backgroundColor: 'red', width: 500, height: 500 }}>
      <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(deleteUser())}
        >
          delete user
        </button>
        <button
          className={styles.button}
          aria-label="OYEEEEE"
          onClick={() => dispatch(setUser({ ad: "yeni ad" }))}
        >
          ad ata
        </button>
      </div>
    </div>
  );
}
