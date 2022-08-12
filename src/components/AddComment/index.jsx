import React from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index = () => {
  return (
    <>
      <div className={styles.root}>
        <Avatar
          classes={{ root: styles.avatar }}
          src="https://cdn-icons-png.flaticon.com/512/147/147144.png"
        />
        <div className={styles.form}>
          <TextField
            label="Write a comment"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Send</Button>
        </div>
      </div>
    </>
  );
};
