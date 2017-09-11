const keys = require('../../config/keys'); // key is needed for redirect link

module.exports = survey => {
	return `
		<html>
			<body>
				<div style="text-align: center;">
					<h3>Please let us know how we are doing</h3>
					<p>${survey.body}</p>
					<div>
						<a href = "${keys.redirectDomain}/api/surveys/thanks">Yes</a>
					</div>
					<div>
						<a href = "${keys.redirectDomain}/api/surveys/thanks">No</a>
					</div>
				</div>
			</body>
		</html>
	`;
};