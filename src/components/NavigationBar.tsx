import React, { useContext } from "react";
import { RootStoreContext } from "src/store/rootStore";
import { observer } from "mobx-react-lite";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Box, createStyles, Link, Toolbar } from "@material-ui/core";

import TotalOfCharacters from "./TotalOfCharacters";

const NavigationBar = observer(() => {
  const classes = useStyles();

  const { antiHeroStore, heroStore, villainStore } =
    useContext(RootStoreContext);

  return (
    <AppBar position="static" style={{ marginBottom: "2rem" }}>
      <Toolbar>
        <Box>
          <Link href="/" className={classes.button} color="inherit">
            Home
          </Link>
        </Box>
        <Box>
          <Link
            href="/anti-heroes"
            className={classes.button}
            color="inherit"
            data-testid="nav-anti-heroes"
          >
            Anti Heroes
          </Link>
          <TotalOfCharacters
            total={antiHeroStore.totalAntiHeroesCount}
            dataTestId={"total-anti-heroes"}
          />
        </Box>
        <Box>
          <Link
            href="/heroes"
            className={classes.button}
            color="inherit"
            data-testid="nav-heroes"
          >
            Heroes
          </Link>
          <TotalOfCharacters
            total={heroStore.totalHeroesCount}
            dataTestId={"total-heroes"}
          />
        </Box>
        <Box>
          <Link
            href="/villains"
            className={classes.button}
            color="inherit"
            data-testid="nav-villains"
          >
            Villains
          </Link>
          <TotalOfCharacters
            total={villainStore.totalVillainsCount}
            dataTestId={"total-villains"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
});

export default NavigationBar;

const useStyles = makeStyles(() =>
  createStyles({
    button: {
      "&:hover": {
        textDecoration: "none",
      },
      "&:focus": {
        outline: "none",
      },
      margin: "0 0.5rem",
      fontWeight: "bold",
    },
  })
);
