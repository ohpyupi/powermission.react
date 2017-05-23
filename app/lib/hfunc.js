export default {
	getCleanTime (time) {
		if (!time) {
			var time = new Date();
			return new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinutes());
		}
		var time = new Date(time);
		return new Date(time.getFullYear(), time.getMonth(), time.getDate(), time.getHours(), time.getMinuues());
	},
	isEmail(email) {
		if (email === null || email == '') {
			return false;
		}
		let regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		return regex.test(email);
	},
	isPassword(...args) {
		try {
			if (args.length === 1) {
				return args[0].length >= 8;
			} else if (args.length === 2) {
				return args[0] === args[1] && args[0].length >= 8;
			}
		} catch (err) {
			return false;
		}
	},
	findSibling (ele, delta) {
		let command;
		let done = false;
		let idx = 1;
		if (delta > 0) {
			command = 'nextSibling';
		} else {
			command = 'previousSibling';
		}
		let sibling = ele[command];
		while (!done) {
			if (idx === Math.abs(delta)) {
				done = !done;
			} else {
				sibling = sibling[command];
				idx++;
			}
		}
		return sibling;
	}
}
