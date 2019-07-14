import axios from 'axios';
const API_URL = '';

axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
axios.defaults.xsrfCookieName = "csrftoken";

export default class PostService {

	constructor(){}

	getSubmit(purl) {
		const url = `${API_URL}/api/posts/submit?url=${purl}`;
		return axios.get(url).then(response => response);
	}

  getPosts() {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts`;
		return axios.get(url).then(response => response);
	}

  getPostsbyUser(username) {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts/${username}`;
		return axios.get(url).then(response => response);
	}

  getPostsbyUserList(username,list) {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts/${username}/${list}`;
		return axios.get(url).then(response => response);
	}

  createPost(post){
		console.log('post:'+JSON.stringify(post));
    const url = `${API_URL}/api/posts/`;
		return axios.post(url,post);
	}

  createView(post){
    const url = `${API_URL}/api/activities/${post.id}/view`;
		return axios.post(url,post);
	}

  createVote(post){
    const url = `${API_URL}/api/activities/${post.id}/vote`;
		return axios.post(url,post);
	}

  destroyVote(id){
    const url = `${API_URL}/api/activities/${id}/vote/destroy`;
		return axios.delete(url);
	}

  createRePost(post){
    const url = `${API_URL}/api/activities/${post.id}/repost`;
		return axios.post(url,post);
	}

  destroyRePost(id){
    const url = `${API_URL}/api/activities/${id}/repost/destroy`;
		return axios.delete(url);
	}

}
