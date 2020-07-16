import client from "./client";

const endpoint = "/OSU/by_address"

const getListings = () => client.get(endpoint);

export default {
    getListings
}