import React from "react";
import { useReactiveVar } from "@apollo/client";
import { makeStyles } from "@material-ui/styles";
import { AppBar, Box, createStyles, Link, Toolbar } from "@material-ui/core";

import TotalOfCharacters from "./TotalOfCharacters";
import { antiHeroesVar, totalHeroesVar, villainsVar } from "src/cache";

const NavigationBar = () => {
  const classes = useStyles();

  const antiHeroesReactiveVar = useReactiveVar(antiHeroesVar);
  const villainsReactiveVar = useReactiveVar(villainsVar);

  const totalHeroes = useReactiveVar(totalHeroesVar);

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
            total={antiHeroesReactiveVar?.antiHeroes?.length}
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
          <TotalOfCharacters total={totalHeroes} dataTestId={"total-heroes"} />
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
            total={villainsReactiveVar?.villains?.length}
            dataTestId={"total-villains"}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

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
