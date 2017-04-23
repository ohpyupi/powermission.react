import React from 'react';
import uuid from 'uuid/v4';

export default class YoutubeIframe extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
		};
		this.player = {};
		this.youtubeId = uuid();
	}
	componentWillMount() {
		this._stopYoutubeByEvent();
	}
	componentDidMount() {
		this._initScriptAsync()
		.then(()=>{
			return this._initYoutubeIframe();
		})
		.then(()=>{
			this.player = new YT.Player(this.youtubeId, {
				height: '360',
				width: '640',
				videoId: this.props.videoId,
			});
		})
		.catch(err=>{
			console.log(err);
		});
	}
	render() {
		return (
			<section className='youtube-iframe-wrap embed-responsive embed-responsive-16by9'>
				<div id={this.youtubeId}></div>
			</section>
		);
	}
	_initScriptAsync () {
		var event = new Event('scriptLoaded')
		return new Promise((resolve, reject)=>{
			document.addEventListener('scriptLoaded', ()=>{
				resolve();
			});
			let scripts = document.querySelectorAll('script');
			let isInit = false;
			for (let i=0; i < scripts.length; i++) {
				if (scripts[i].src === 'https://www.youtube.com/iframe_api') isInit = true;
			}
			if (isInit===true) return;
			let tag = document.createElement('script');
			tag.src = 'https://www.youtube.com/iframe_api';
			tag.async = true;
			tag.onload = ()=>{
				document.dispatchEvent(event);
				resolve();
			};
			tag.onerror = reject;
			let firstScriptTag = document.getElementsByTagName('script')[0];
			firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
		});
	}
	_initYoutubeIframe() {
		return new Promise((resolve, reject)=>{
			let _timer = setInterval(()=>{
				if (YT.loaded === 1) {
					clearInterval(_timer);
					resolve();
				};
			}, 500);
		});
		/*
		*/
	}
	_stopYoutubeByEvent() {
		document.addEventListener('modal-close', ()=>{
			this.player.stopVideo();
		}, false);
	}
}
