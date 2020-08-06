import client from "./client";

const endpoint = `/OSU/by_address?`;

const getListings = (filterState) =>
  client.get(
    endpoint +
      `price_low=${filterState.price_low}&price_high=${filterState.price_high}&
       beds_low=${filterState.beds_low}&beds_high=${filterState.beds_high}&
       baths_low=${filterState.baths_low}&baths_high=${filterState.baths_high}&
       distance_low=${filterState.distance_low}&distance_high=${filterState.distance_high}&
       drive_low=${filterState.drive_low}&drive_high=${filterState.drive_high}&
       walk_low=${filterState.walk_low}&walk_high=${filterState.walk_high}`
  );

export default {
  getListings,
};
