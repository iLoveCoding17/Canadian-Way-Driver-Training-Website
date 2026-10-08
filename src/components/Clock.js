export default function TimeSelector({ onTimeChange }) {
	const handleChange = (e) => {
		onTimeChange(e.target.value);
	};
}
