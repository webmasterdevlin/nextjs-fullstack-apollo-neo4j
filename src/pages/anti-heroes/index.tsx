import React, { useEffect, useContext, useState } from "react";
import TitleBar from "src/components/TitleBar";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import FormSubmission from "src/components/FormSubmission";
import Layout from "src/components/Layout";
import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const AntiHeroesPage = () => {
  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  return (
    <Layout title={"Next Mobx - Anti Heroes Page"}>
      <TitleBar title={"Anti-Heroes Page"} />
      {/*<FormSubmission postAction={antiHeroStore.postAntiHeroAction} />*/}
      <UpdateUiLabel />
      <>
        {false ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          []?.map((ah) => (
            <Box
              mb={2}
              key={ah._id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <div>
                <Typography>
                  <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                  {counter === ah._id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"default"}
                  data-testid={"mark-button"}
                >
                  Mark
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"contained"}
                  color={"secondary"}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  data-testid={"delete-button"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {/*{antiHeroStore.antiHeroes.length === 0 && !antiHeroStore.loading && (*/}
      {/*  <Button*/}
      {/*    data-testid={"refetch-button"}*/}
      {/*    className={classes.button}*/}
      {/*    variant={"contained"}*/}
      {/*    color={"primary"}*/}
      {/*    onClick={antiHeroStore.getAntiHeroesAction}*/}
      {/*  >*/}
      {/*    Re-fetch*/}
      {/*  </Button>*/}
      {/*)}*/}
    </Layout>
  );
};

export async function getStaticProps() {
  return {
    props: {
      antiHeroes: [],
    },
  };
}

export default AntiHeroesPage;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      margin: "0 0.5rem",
      "&:focus": {
        outline: "none",
      },
    },
  })
);
