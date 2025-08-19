import moment from "moment";

export const useGreeting = () => {
	let g = null; //return g
	let color = 'white';

	var split_afternoon = 12; //24hr time to split the afternoon
	var split_evening = 17; //24hr time to split the evening
	var split_night = 21; //24hr time to split the evening
	var split_morning = 3;

	var currentHour = parseFloat(moment().format("HH"));

	if (currentHour >= split_afternoon && currentHour < split_evening) {
		g = "Good Afternoon";
	} else if (currentHour >= split_evening && currentHour < split_night) {
		g = "Good Evening";
	} else if (currentHour >= split_morning && currentHour < split_afternoon) {
		g = "Good Morning,\nHave A Good Day";
	} else {
		g = "Its Time To sleep,\nHave A Good Night";
	}

	return { greeting: g, color };
}
