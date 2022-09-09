import {
  Alert,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  Link,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import React from "react";
import Layout from "../../components/Layout";
import client from "../../utils/client";
import NextLink from "next/link";
import { classes } from "../../utils/classes";
import Image from "next/image";
import { UrlFor, UrlForThumbail } from "../../utils/image";
import { useContext } from "react";
import { Store } from "../../Store/Store";
import { useSnackbar } from "notistack";
import axios from "axios";
const ProductScreen = (props) => {
  const { slug } = props;
  const {
    state: { cart },
    dispatch,
  } = useContext(Store);
  const { enqueueSnackbar } = useSnackbar();
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
        console.log("product", product);
        setState({ ...state, product, loading: false });
      } catch (error) {
        setState({ ...state, error: error.message, loading: false });
      }
    };
    getProducts();
  }, []);

  const handleAddToCart = async () => {
    const existItem = cart.cartItems.find((item) => item._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    const productItem = await client.fetch(
      `*[_type == "product" && _id == $id][0]`,
      {
        id: product._id,
      }
    );
    if (productItem.countInStock < quantity) {
      enqueueSnackbar("Sorry product is out stock!!", { variant: "error" });
      return;
    }

    dispatch({
      type: "ADD_PRODUCT_ITEM",
      payload: {
        _key: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: UrlForThumbail(product.image),
        quantity,
      },
    });

    enqueueSnackbar(`${product.name} added to cart`, { variant: "success" });
  };
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
            <Grid item md={3} sx={12}>
              <List>
                <ListItem>
                  <Typography variant="h1" component={"h1"}>
                    {product.name}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Category: {product.category}</Typography>
                </ListItem>
                <ListItem>
                  <Typography>Brand: {product.brand}</Typography>
                </ListItem>
                <ListItem>
                  <Rating value={product.rating} readOnly />
                  <Typography sx={classes.smallText}>
                    ({product.numReviews}) reviews {product.category}
                  </Typography>
                </ListItem>
                <ListItem>
                  <Typography>Discription: {product.description}</Typography>
                </ListItem>
              </List>
            </Grid>
            <Grid item md={3} xs={12}>
              <Card>
                <List>
                  <ListItem>
                    <Grid container>
                      <Grid xs={6}>
                        <Typography>Price</Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography>{product.name}</Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem>
                    <Grid container>
                      <Grid xs={6}>
                        <Typography>Status</Typography>
                      </Grid>
                      <Grid xs={6}>
                        <Typography>
                          {product.countInStock > 0 ? "Is Stock" : "unInValid"}
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                  <ListItem onClick={handleAddToCart}>
                    <Button variant="contained" fullWidth>
                      Add To Card
                    </Button>
                  </ListItem>
                </List>
              </Card>
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
