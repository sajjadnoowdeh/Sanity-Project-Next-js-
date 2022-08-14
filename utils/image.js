import ImageUrlBuilder from "@sanity/image-url";
import client from "./client";

const UrlForThumbail = (source) => {
  return ImageUrlBuilder(client).image(source).width(300).url();
};

const UrlFor = (source) => {
  return ImageUrlBuilder(client).image(source).width(80).url();
};

export { UrlFor, UrlForThumbail };
