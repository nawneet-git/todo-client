import axios from 'axios';

const AUTH_KEY = 'authItems';

let baseUrl = 'http://localhost:3001';
let version = '1';
let API_URL = baseUrl + '/';


class AxiosClientProvider {

    constructor() {

        // this.axiosClient;
        // this.authToken;
        // this.header;
        // this.defaultOptions;
        // this.instance;
        this.defaultOptions = {
            baseURL: API_URL,
            method: 'get',
            headers: {
                // token: token,
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            },
        };


        // this.storage.get(AUTH_KEY).then(result => {
        //     if (result && result != '') {
        //         console.log("Token found ", result)
        //         this.defaultOptions.headers['token'] = result;
        //     }
        // });
    }

    // getAuthToken() {
    //     return this.storage.get(AUTH_KEY);
    // }

    getClient() {
        // return this.getAuthToken().then(result => {
        //     if (result && result != '') {
        //         console.log("Token found ", result)
        //         this.defaultOptions.headers['token'] = result;
        //         // let _this = this;
        //         this.instance = axios.create(this.defaultOptions);
        //         console.log("instance ", this.instance);
        //         return this.instance;
        //     }
        // })




        // Setting up axios client with default url
        this.instance = axios.create(this.defaultOptions);

        return this.instance;
    }

    getClientWithToken(apiToken) {
        this.defaultOptions.headers['authorization'] = apiToken;
        // Setting up axios client with default url
        this.instance = axios.create(this.defaultOptions);
        return this.instance;
    }
};

export default AxiosClientProvider;

// module.exports = { AxiosClientProvider };

