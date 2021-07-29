import { Typography } from "@material-ui/core";

import Layout from "src/components/Layout";

export default function Home() {
  return (
    <Layout title="Home | Next.js + Mobx Example">
      <Typography variant={"h2"}>
        Welcome to Fullstack Next.js with Apollo Client + Neo4j
      </Typography>
    </Layout>
  );
}
