import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import SinglePost from "./Post/SinglePost";

export default function Posts() {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);

  const GetPostData = () =>
    axios
      .get("http://localhost:3000/posts")
      .then(({ data }) => {
        setData(data);
      })
      .catch((e) => {
        console.log("error", e);
        setFetched(true);
      });

  useEffect(() => {
    !fetched && GetPostData();
    setFetched(true);
  }, [fetched]);

  return (
    <Container>
      <Grid container spacing={1}>
        {!data.length ? (
          <Grid item xs={12}>
            <Box
              p={5}
              mt={5}
              display='flex'
              justifyContent='center'
              alignItems='center'>
              <CircularProgress />
            </Box>
          </Grid>
        ) : data.length > 0 ? (
          data.map((item, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <SinglePost item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color='secondary' variant='h6' align='center'>
              {" "}
              No Data Found To show !
            </Typography>
          </Grid>
        )}
        {/* {!data.length ? (
          data.map((item, i) => (
            <Grid item xs={12} sm={4} key={i}>
              <SinglePost item={item} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography color='secondary' variant='h6' align='center'>
              {" "}
              No Data Found To show !
            </Typography>
          </Grid>
        )} */}
      </Grid>
    </Container>
  );
}
