import AxiosClientProvider from './apiClient';

class UserService {
    constructor() {
        this.apiClient = new AxiosClientProvider();
        this.apiClient = this.apiClient.getClient();
    }



    getUserSignin(jsonBody, cb) {
        console.log("response ", jsonBody)
        this.apiClient.post('user/login', jsonBody).then((response) => {
            if (response.data) {
                console.log("response data ", response.data)
                let dataObj = response.data;
                if (dataObj.message == "Login successful") {
                    cb(dataObj);
                }
                else {
                    cb()
                }
            } else {
                cb()
            }
        }).catch(err => {
            console.log('Some error occured in get category', err);
            cb();
        })
    }

    getUserSignUp(jsonBody, cb) {
        this.apiClient.post('user/register', jsonBody).then((response) => {
            if (response.data) {
                let dataObj = response.data;
                if (dataObj.message == "Success: Account created!") {
                    console.log("Main response status: ", dataObj);
                    cb(dataObj);
                }
                else {
                    cb()
                }

            } else {
                cb()
            }
        }).catch(err => {
            console.log('Some error occured ', err);
            cb();
        })
    }

    updateInfo(jsonBody, cb) {
        this.apiClient.put('/jobs/update_institute', jsonBody).then((response) => {
            if (response.data) {
                let dataObj = response.data;
                if (dataObj.status == true) {
                    cb(dataObj.data);
                }
                else {
                    cb()
                }

            } else {
                cb()
            }
        }).catch(err => {
            console.log('Some error occured in get category', err);
            cb();
        })
    }


}

export default UserService;