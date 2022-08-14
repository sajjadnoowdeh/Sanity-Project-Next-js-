import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@mui/material";
import React from "react";
import Layout from "../../components/Layout";
import client from "../../utils/client";
import NextLink from "next/link";
import { classes } from "../../utils/classes";
import Image from "next/image";
import { UrlFor } from "../../utils/image";
const ProductScreen = (props) => {
  const { slug } = props;
  console.log(slug);
  const [state, setState] = React.useState({
    product: {},
    loading: true,
    error: "",
  });
  const { loading, product, error } = state;
  React.useState(() => {
    const getProducts = async () => {
      try {
        const product = await client.fetch(
          `*[_type == "product" && slug.current == $slug][0]`,
          { slug }
        );
        console.log(product);
        setState({ ...state, product, loading: false });
      } catch (error) {
        setState({ ...state, error: error.message, loading: false });
      }
    };
    getProducts();
  }, []);
  return (
    <Layout title={product?.title}>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert variant="error">{error}</Alert>
      ) : (
        <Box>
          <Box sx={classes.section}>
            <NextLink href={"/"} passHref>
              <Link>
                <Typography>back to result</Typography>
              </Link>
            </NextLink>
          </Box>
          <Grid container spacing={1}>
            <Grid item md={6} sx={12}>
              <Image
                src={UrlFor(product.image)}
                alt={product.name}
                layout={"responsive"}
                width={640}
                height={640}
              />
            </Grid>
          </Grid>
        </Box>
      )}
    </Layout>
  );
};

export default ProductScreen;

export const getServerSideProps = (context) => {
  console.log("ssss", context);
  return { props: { slug: context.params.slug } };
};
