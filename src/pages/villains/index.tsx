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
import { GET_VILLAINS } from "src/graphql-operations/queries";
import { Villain, VillainsData } from "src/models/client/villainModel";
import {
  CREATE_VILLAIN,
  DELETE_VILLAIN_BY_ID,
} from "src/graphql-operations/mutations";

const VillainsPage = () => {
  const smallScreen = useMediaQuery("(max-width:600px)");
  const classes = useStyles();

  /*local state*/
  const [counter, setCounter] = useState("0");

  /*Apollo Client hooks*/
  const { loading, data, fetchMore } = useQuery<VillainsData>(GET_VILLAINS);
  const [removeVillain] = useMutation<void>(DELETE_VILLAIN_BY_ID);
  const [addVillain] = useMutation<{ createVillain: Villain }>(CREATE_VILLAIN);

  const handleCreate = async (villain: Villain) => {
    await addVillain({
      variables: villain,
      update: (apolloCache, { data: response }) => {
        const { villains } = apolloCache.readQuery<VillainsData>({
          query: GET_VILLAINS,
        });

        cache.writeQuery({
          query: GET_VILLAINS,
          data: {
            villains: [...villains, response.createVillain],
          },
        });
      },
    });
  };

  const handleDelete = async (id: string) => {
    await removeVillain({
      variables: { id },
      update: (apolloCache) => {
        const { villains } = apolloCache.readQuery<VillainsData>({
          query: GET_VILLAINS,
        });

        cache.writeQuery({
          query: GET_VILLAINS,
          data: {
            villains: villains.filter((villain) => villain.id != id),
          },
        });
      },
    });
  };

  const handleSoftDelete = (id: string) => {
    const { villains } = cache.readQuery<VillainsData>({
      query: GET_VILLAINS,
    });

    cache.writeQuery({
      query: GET_VILLAINS,
      data: {
        villains: villains.filter((villain) => villain.id != id),
      },
    });
  };

  const refetch = async () =>
    await fetchMore({
      query: GET_VILLAINS,
    });

  return (
    <Layout title={"Next Apollo Client - Villains Page"}>
      <TitleBar title={"Super Villains Page"} />
      <FormSubmission postAction={handleCreate} />
      <UpdateUiLabel />
      <>
        {loading ? (
          <Typography data-testid="loading" variant={"h2"}>
            Loading.. Please wait..
          </Typography>
        ) : (
          data?.villains?.map((v) => (
            <Box
              mb={2}
              key={v.id}
              display={"flex"}
              flexDirection={smallScreen ? "column" : "row"}
              justifyContent={"space-between"}
              data-testid={"card"}
            >
              <div>
                <Typography>
                  <span>{`${v.firstName} ${v.lastName} is ${v.knownAs}`}</span>
                  {counter === v.id && <span> - marked</span>}
                </Typography>
              </div>
              <div>
                <Button
                  className={classes.button}
                  onClick={() => setCounter(v.id)}
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
                  onClick={() => handleSoftDelete(v.id)}
                >
                  Remove
                </Button>{" "}
                <Button
                  className={classes.button}
                  variant={"outlined"}
                  color={"primary"}
                  data-testid={"delete-button"}
                  onClick={() => handleDelete(v.id)}
                >
                  DELETE in DB
                </Button>
              </div>
            </Box>
          ))
        )}
      </>
      {data?.villains?.length === 0 && !loading && (
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

export default VillainsPage;

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
