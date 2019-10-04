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

  getPosts(page) {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts/?page=${page}`;
		return axios.get(url).then(response => response);
	}
  
  getRecentPosts(page) {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts/recent?page=${page}`;
		return axios.get(url).then(response => response);
	}

  getPostsbyUser(username,page) {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts/${username}?page=${page}`;
		return axios.get(url).then(response => response);
	}

  getPostsbyUserList(username,list,page) {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts/${username}/lists/${list}?page=${page}`;
		return axios.get(url).then(response => response);
	}

  getPostsbyUserEmoji(username,emoji,page) {
    //console.log("getPosts");
		const url = `${API_URL}/api/posts/${username}/emojis/${emoji}?page=${page}`;
		return axios.get(url).then(response => response);
	}
	
	/*getPostsbyCommunity(community) {
    console.log("getPostsbyCommunity");
		const url = `${API_URL}/api/community/posts/${community}`;
		return axios.get(url).then(response => response);
	}*/

  updatePost(post){
		console.log('post:'+JSON.stringify(post));
    const url = `${API_URL}/api/posts/update`;
		return axios.post(url,post);
	}

  updateView(post){
    const url = `${API_URL}/api/activities/${post.id}/view`;
		return axios.post(url,post);
	}

  updateVote(post){
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
