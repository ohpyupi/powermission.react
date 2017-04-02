import axios from 'axios';

export default class YoutubeService {
	constructor() {
		this.list = [];
	}
	getList(playlist_id) {
		return new Promise((resolve, reject)=>{
			axios.get(`/api/google-youtube/playlist/${playlist_id}`)
			.then(res=>{
				resolve(this.list.concat(res.data.items));
			})
			.catch(err=>{
				console.log(err.response.data.message);
				reject();
			});
		});
	}
}
