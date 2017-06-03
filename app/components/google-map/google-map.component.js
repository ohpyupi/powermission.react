import React from 'react';

export default class GoogleMap extends React.Component {
	constructor(props) {
		super(props);
		this.map = null;
		this.markerArr = [];
	}
	componentDidMount() {
	}
	componentWillMount() {
		this.loadGoogleMapScript();
	}
	componentWillUnmount() {
	}
	loadGoogleMapScript() {
		let s = document.createElement('script');
		s.type = 'text/javascript';
		s.async = true;
		s.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_KEY}`;
		s.onload = this.initGoogleMap();
		let t = document.getElementsByTagName('script')[0];
		t.parentNode.insertBefore(s, t);
	}
	initGoogleMap() {
		let timer = setInterval(()=>{
			try {
				if (google) {
					clearInterval(timer);
					this.map = new google.maps.Map(document.getElementById('react-google-map'), this.props.options);
					this.renderMarkers();
				}
			} catch (err) {}
		}, 500);
	}
	render() {
		const style = {
			"minHeight": '220px',
		};
		return (
			<div id='react-google-map' className={`${this.props.className}`} style={style}></div>
		);
	}
	renderMarkers() {
		let _children = [].concat(this.props.children);
		let markerArr = _children.filter((val, idx)=>{
			return val.type.name === 'GoogleMarker';
		});
		for (let i = 0; i < markerArr.length; i++) {
			this.markerArr.push(new google.maps.Marker({
				position: markerArr[i].props.options ? markerArr[i].props.options.position || this.props.options.center : this.props.options.center,
				map: this.map,
			}));
		}
		console.log(this.markerArr);
	}
}

