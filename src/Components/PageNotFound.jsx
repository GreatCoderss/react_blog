import { Button } from "@material-ui/core";
import { blue } from "@material-ui/core/colors";
import { Backspace } from "@material-ui/icons";
import React from "react";
import { Link, useParams } from "react-router-dom";

export default function PageNotFound() {
  const params = useParams();
  console.log("params", params);
  return (
    <div>
      <h1>
        Tu yhe kya lekhtee Dost{" "}
        <span style={{ color: blue[500] }}>{Object.values(params)}</span>
      </h1>
      <h1>Jaa Nhe dete tere ko mai page </h1>
      <Button
        component={Link}
        to='/'
        variant='contained'
        color='primary'
        startIcon={<Backspace />}>
        Back To home
      </Button>
    </div>
  );
}
