import { Alert, CircularProgress, Grid } from "@mui/material";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import client from "../utils/client";

export default function Home() {
  const [state, setState] = React.useState({
    products: [],
    error: "",
    loading: true,
  });
  const { products, loading, error } = state;
  React.useEffect(() => {
    const getProducts = async () => {
      try {
        const products = await client.fetch(`*[_type == "product"]`);
        console.log(products);
        setState({ products, loading: false });
      } catch (err) {
        setState({ loading: false, error: err.message });
      }
    };

    getProducts();
  }, []);
  return (
    <Layout>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant={"danger"}>{error}</Alert>
      ) : (
        <Grid container>
          {products?.map((item) => (
            <Grid md={4} item key={item.slug}>
              {item.name}
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
