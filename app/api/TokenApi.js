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

    static async getUserData(userData){
        let res = await this.request(`users/${userData.uid}`);
        console.log("🚀 ~ file: TokenApi.js:28 ~ TokenApi ~ getUserData ~ res:", res)
        return res[0];
    }

    static async addUserData(userData) {
        let res = await this.request(`register`, userData, "post");
        console.log("🚀🚀 ~ file: TokenApi.js:40 ~ TokenApi ~ addUserData ~ res:", res)
        return res;
    }
    
    static async addUpcomingDate(userData) {
        let res = await this.request(`adddate/${userData.uid}`, userData, "post");
        console.log("🚀🚀 ~ file: TokenApi.js:46 ~ TokenApi ~ addUserData ~ res:", res)
        return res;
    }
}