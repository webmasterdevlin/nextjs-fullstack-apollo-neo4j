import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import {
  Box,
  Button,
  createStyles,
  Typography,
  useMediaQuery,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { cache } from "src/cache";
import TitleBar from "src/components/TitleBar";
import UpdateUiLabel from "src/components/UpdateUiLabel";
import FormSubmission from "src/components/FormSubmission";
import Layout from "src/components/Layout";
import { GET_ANTI_HEROES } from "src/graphql-operations/queries";
import { AntiHero, AntiHeroesData } from "src/models/client/antiHeroModel";
import {
  CREATE_ANTI_HERO,
  DELETE_ANTI_HERO_BY_ID,
} from "src/graphql-operations/mutations";

const AntiHeroesPage = () => {
  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  /*Apollo Client hooks*/
  const { loading, data, fetchMore } =
    useQuery<AntiHeroesData>(GET_ANTI_HEROES);
  const [removeHero] = useMutation<void>(DELETE_ANTI_HERO_BY_ID);
  const [addHero] = useMutation<{ createAntiHero: AntiHero }>(CREATE_ANTI_HERO);

  const handleCreate = async (antiHero: AntiHero) => {
    await addHero({
      variables: antiHero,
      update: (apolloCache, { data: response }) => {
        const { antiHeroes } = apolloCache.readQuery<AntiHeroesData>({
          query: GET_ANTI_HEROES,
        });

        cache.writeQuery({
          query: GET_ANTI_HEROES,
          data: {
            antiHeroes: [...antiHeroes, response.createAntiHero],
          },
        });
      },
    });
  };

  const handleDelete = async (id: string) => {
    await removeHero({
      variables: { id },
      update: (apolloCache) => {
        const { antiHeroes } = apolloCache.readQuery<AntiHeroesData>({
          query: GET_ANTI_HEROES,
        });

        cache.writeQuery({
          query: GET_ANTI_HEROES,
          data: {
            antiHeroes: antiHeroes.filter((antiHero) => antiHero.id != id),
          },
        });
      },
    });
  };

  const handleSoftDelete = (id: string) => {
    const { antiHeroes } = cache.readQuery<AntiHeroesData>({
      query: GET_ANTI_HEROES,
    });

    cache.writeQuery({
      query: GET_ANTI_HEROES,
      data: {
        antiHeroes: antiHeroes.filter((antiHero) => antiHero.id != id),
      },
    });
  };

  const refetch = async () =>
    await fetchMore({
      query: GET_ANTI_HEROES,
    });

  return (
    <Layout title={"Next Apollo Client - AntiHeroes Page"}>
      <TitleBar title={"Anti Heroes Page"} />
      <FormSubmission postAction={handleCreate} />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          data?.antiHeroes?.map((ah) => (
            <Box
              mb={2}
              key={ah.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <div>
                <Typography>
                  <span>{`${ah.firstName} ${ah.lastName} is ${ah.knownAs}`}</span>
                  {counter === ah.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(ah.id)}
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
                  onClick={() => handleSoftDelete(ah.id)}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  data-testid={"delete-button"}
                  onClick={() => handleDelete(ah.id)}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {data?.antiHeroes?.length === 0 && !loading && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={refetch}
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

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
