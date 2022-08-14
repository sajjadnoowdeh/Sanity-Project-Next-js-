import { Alert, CircularProgress, Grid } from "@mui/material";
import Link from "next/link";
import React, { useEffect } from "react";
import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
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
          {products?.map((product) => (
            <Grid md={4} item key={product._id}>
              <ProductItem product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Layout>
  );
}
