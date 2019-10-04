import axios from 'axios';
const API_URL = '';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default class AccountService {

	constructor(){}

  getSettings() {
    console.log("getSettings");
		const url = `${API_URL}/api/account/settings`;
		return axios.get(url).then(response => response);
	}
    
}