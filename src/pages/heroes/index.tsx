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
import { GET_HEROES } from "src/graphql-operations/queries";
import { Hero, HeroesData } from "src/models/client/heroModel";
import {
  CREATE_HERO,
  DELETE_ANTI_HERO_BY_ID,
} from "src/graphql-operations/mutations";

const HeroesPage = () => {
  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  const { loading, data, fetchMore } = useQuery<HeroesData>(GET_HEROES);

  const [removeHero] = useMutation<void>(DELETE_ANTI_HERO_BY_ID, {
    refetchQueries: [GET_HEROES, "GET_HEROES"],
  });
  const [addHero] = useMutation<void>(CREATE_HERO, {
    refetchQueries: [GET_HEROES, "GET_HEROES"],
  });

  const handleCreate = async (hero: Hero) => {
    await addHero({
      variables: { ...hero },
      update: (apolloCache, { data: response }) => {
        const data = apolloCache.readQuery<HeroesData>({
          query: GET_HEROES,
        });

        console.log("response:", JSON.stringify(response, null, 2));

        cache.writeQuery({
          query: GET_HEROES,
          data: {
            heroes: [],
          },
        });
      },
    });
  };

  const handleDelete = async (id: string) => {
    await removeHero({
      variables: { id },
      update: (apolloCache) => {
        const data = apolloCache.readQuery<HeroesData>({
          query: GET_HEROES,
        });
        let newData: HeroesData = {
          heroes: [],
        };
        newData.heroes = data?.heroes?.filter((hero) => hero.id != id);
        cache.writeQuery({ query: GET_HEROES, data: newData.heroes });
      },
    });
  };

  const handleSoftDelete = (id: string) => {
    const data = cache.readQuery<HeroesData>({
      query: GET_HEROES,
    });
    let newData: HeroesData = {
      heroes: [],
    };

    newData.heroes = data?.heroes?.filter((hero) => hero.id != id);

    cache.writeQuery({ query: GET_HEROES, data: newData });
  };

  return (
    <Layout title={"Next Apollo Client - Heroes Page"}>
      <TitleBar title={"Super Heroes Page"} />
      <FormSubmission postAction={handleCreate} />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          data?.heroes?.map((h) => (
            <Box
              mb={2}
              key={h.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <div>
                <Typography>
                  <span>{`${h.firstName} ${h.lastName} is ${h.knownAs}`}</span>
                  {counter === h.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(h.id)}
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
                  onClick={() => handleSoftDelete(h.id)}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  data-testid={"delete-button"}
                  onClick={() => handleDelete(h.id)}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {data?.heroes?.length === 0 && !loading && (
        <Button
          data-testid={"refetch-button"}
          className={classes.button}
          variant={"contained"}
          color={"primary"}
          onClick={async () =>
            await fetchMore({
              query: GET_HEROES,
            })
          }
        >
          Re-fetch
        </Button>
      )}
    </Layout>
  );
};

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
