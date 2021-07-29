import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react-lite";
import { RootStoreContext } from "src/store/rootStore";
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

const HeroesPage = observer(() => {
  const { heroStore } = useContext(RootStoreContext);

  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  useEffect(() => {
    heroStore.getHeroesAction();
  }, []);

  return (
    <Layout title={"Next Mobx - Anti Heroes Page"}>
      <TitleBar title={"Super Heroes Page"} />
      <FormSubmission postAction={heroStore.postHeroAction} />
      <UpdateUiLabel />
      <>
        {heroStore.loading ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          heroStore.heroes.map((h) => (
            <Box
              mb={2}
              key={h._id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <div>
                <Typography>
                  <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                  {counter === h._id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(h._id)}
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
                  onClick={() => heroStore.softDeleteHeroAction(h)}
                  data-testid={"remove-button"}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  onClick={async () => await heroStore.deleteHeroAction(h._id)}
                  data-testid={"delete-button"}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {heroStore.heroes.length === 0 && !heroStore.loading && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={heroStore.getHeroesAction}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
});

export default HeroesPage;

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
