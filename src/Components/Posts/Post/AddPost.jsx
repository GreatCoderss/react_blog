import React, { useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import FileBase64 from "react-file-base64";
import joi from "joi-browser";
import { TextInputField } from "../../common/formComponents";
import { AddPosts } from "../../../HttpRequests/posts";

export default function AddPost() {
  const [state, setState] = useState({
    data: {
      title: "",
      imageFileSet: "",
      description: "",
    },
    errors: {},
  });

  // form validation technique
  const schema = {
    title: joi.string().required().label("Title ").min(5),
    imageFileSet: joi.string().required().label("Image "),
    description: joi.string().required().label("Description "),
  };

  const validate = () => {
    const errorObj = { ...state.errors };
    const { error } = joi.validate(state.data, schema, { abortEarly: false });
    if (!error) return {};
    error.details.map((item) => (errorObj[item.path] = item.message));
    return errorObj;
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const { data } = state;
    const errorMessages = validate();
    console.log(state);
    setState({ data, errors: errorMessages });

    AddPosts({ data })
      .then(() => console.log("Post successfully"))
      .catch((e) => console.log("error", e));
  };

  const handleOnChange = ({ target }) => {
    const { data, errors } = state;
    const { error } = joi.validate(data[target.name], schema[target.name], {
      abortEarly: true,
    });
    //validation with joi
    !error
      ? (errors[target.name] = "")
      : (errors[target.name] = error.details[0].message);

    //updating input value
    data[target.name] = target.value;
    setState({ data, errors });
  };

  return (
    <Container maxWidth='lg'>
      <form onSubmit={handleOnSubmit}>
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          style={{ height: "75vh" }}>
          <Grid item xs={12} sm={6}>
            {/* title,image description  */}
            <Typography
              variant='h6'
              align='center'
              color='textPrimary'
              gutterBottom>
              {" "}
              Add Post{" "}
            </Typography>
            <Box mt={2} mb={1}>
              <TextInputField
                name='title'
                state={state.data}
                errors={state.errors}
                onChange={handleOnChange}
              />
            </Box>
            <Box mt={2} mb={1}>
              <FileBase64
                onDone={(e) => {
                  const { data, errors } = state;
                  console.log("event", e);
                  data["imageFileSet"] = e.base64;
                  setState({ data, errors });
                }}
              />
              {state.errors && state.errors.imageFileSet ? (
                <p
                  style={{
                    color: "#f44336",
                    fontSize: "12px",
                    paddingLeft: "16px",
                    fontFamily: "Roboto",
                  }}>
                  {state.errors.imageFileSet}
                </p>
              ) : null}
            </Box>
            <Box mt={2} mb={1}>
              <TextInputField
                name='description'
                state={state.data}
                errors={state.errors}
                onChange={handleOnChange}
              />
            </Box>
            <Box mt={2}>
              <Button
                variant='outlined'
                color='primary'
                fullWidth
                type='submit'>
                Submit data
              </Button>
            </Box>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
}
