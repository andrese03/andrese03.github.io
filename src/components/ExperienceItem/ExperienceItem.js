import React from 'react';

const ExperienceItem = ({ title, description, startDate, endDate, company, location }) => {
	return (
		<div className="item">
			<div className="meta">
				<div className="upper-row">
					<h3 className="job-title">{title}</h3>
					<div className="time">{startDate} - {endDate} </div>
				</div>
				<div className="company">{company}, {location}</div>
			</div>
			<div className="details">
				<p>{description}</p>
			</div>
		</div>
	);
};

export default ExperienceItem;
