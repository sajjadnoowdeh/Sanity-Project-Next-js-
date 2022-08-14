import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import React from "react";
import { UrlForThumbail } from "../utils/image";

const ProductItem = ({ product }) => {
  return (
    <Card>
      <NextLink href={`/product/${product.slug.current}`} passHref>
        <CardActionArea>
          <CardMedia
            component={"img"}
            image={UrlForThumbail(product.image)}
            title={product.name}
          ></CardMedia>
        <CardContent>
          <Typography>{product.name}</Typography>
          <Typography>
            {product.rating} ${product.numReviews} raviews
          </Typography>
        </CardContent>
        </CardActionArea>
      </NextLink>
      <CardActions>
        <Typography>{product.price}</Typography>
        <Button size={"small"} color={"primary"}>
          Add To Card
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductItem;
