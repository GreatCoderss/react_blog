import React, { useEffect, useState } from "react";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import joi from "joi-browser";
import { TextInputField } from "../../common/formComponents";
import FileBase64 from "react-file-base64";
import { useStyles } from "./style";
import { useParams } from "react-router-dom";
import { GetPostDetailsById, UpdatePost } from "../../../HttpRequests/posts";

export default function EditPost(props) {
  const { id } = useParams();
  const classes = useStyles();

  const [updated, setUpdated] = useState(false);

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

    //adding date while updating
    data.publishedAt = Date.now();
    setState({ data, errors: errorMessages });

    //updating blog Data
    UpdatePost({ id, data })
      .then(({ data }) => {
        console.log("updated SuccessFully", data);
        props.history.push("/posts");
      })
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

  const populateFieldWithData = () =>
    GetPostDetailsById({ id })
      .then(({ data: postData }) => {
        console.log("data", postData);
        const { data, errors } = state;
        data.title = postData.title;
        data.imageFileSet = postData.imageFileSet;
        data.description = postData.description;
        setState({ data, errors });
      })
      .catch((e) => {
        console.log("error", e);
        if (e.response.status) {
          props.history.push("/posts");
        }
      });

  useEffect(() => {
    if (!updated) {
      populateFieldWithData();
      setUpdated(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updated]);

  return (
    <Container maxWidth='lg'>
      <Grid container>
        <Grid item xs={12}>
          <Typography
            variant='h6'
            component='h5'
            color='primary'
            align='center'>
            {" "}
            Edit Blog Post{" "}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <Box p={2}>
            <img
              src={state.data.imageFileSet}
              alt={state.data.title}
              className={classes.media}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={7} md={8}>
          <form onSubmit={handleOnSubmit}>
            <Grid container justifyContent='center' alignItems='center'>
              <Grid item xs={12}>
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
                    variant='contained'
                    color='primary'
                    fullWidth
                    type='submit'>
                    Update Data
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </Container>
  );
}
