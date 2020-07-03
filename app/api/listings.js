import client from "./client";

const endpoint = "/OSU/by_unit"

const getListings = () => client.get(endpoint);

export default {
    getListings
}