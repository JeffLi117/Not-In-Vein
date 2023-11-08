import axios from 'axios';

const BASE_URL = process.env.BASE_URL || "http://localhost:3001";

export default class TokenApi {
    //  == store received token ==== //
    static token;

    // ============ method to make api call easier  ======== //
    static async request(endpoint, data = {}, method = "get") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${TokenApi.token}` };
        const params = (method === "get")
            ? data
            : {};

        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err);
            // let message = err.response.data.error.message;
            // throw Array.isArray(message) ? message : [message];
        }
    }

    // ============ method to make api call easier  ======== //
    static async post(endpoint, data = {}, method = "post") {
        const url = `${BASE_URL}/${endpoint}`;
        const headers = { Authorization: `Bearer ${TokenApi.token}` };
        const params = (method === "post")
            ? data
            : {};
        console.log("data within the static async post is ", data);
        try {
            return (await axios({ url, method, data, params, headers })).data;
        } catch (err) {
            console.error("API Error:", err);
            // let message = err.response.data.error.message;
            // throw Array.isArray(message) ? message : [message];
        }
    }

    static async getUserData(userid){
        let res = await this.request(`users/${userid}`);
        console.log("🚀 ~ file: TokenApi.js:28 ~ TokenApi ~ getUserData ~ res:", res)
        return res[0];
    }

    static async addUserData(userData){
        let res = await this.post(`register`, userData);
        console.log("🚀🚀 ~ file: TokenApi.js:51 ~ TokenApi ~ addUserData ~ res:", res)
        return res;
    }
}