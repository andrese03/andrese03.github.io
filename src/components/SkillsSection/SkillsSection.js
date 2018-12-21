import React, { useEffect } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faRocket } from '@fortawesome/free-solid-svg-icons';

import './SkillsSection.scss';

/* 
	Languages: JavaScript, C#, Apex, Python, HTML, CSS, Dart, Java and PHP
	Operating Systems: Linux, Windows
	Frameworks and technologies: Apache, Entity Framework, AngularJS, React, NodeJS, CodeIgniter, ASP.NET MVC, Bootstrap, Material Design, JQuery, Ngnix.
	Databases: MongoDB, MySQL, MSSQL, Oracle.
	Modeling: database relational model and nosql databases
	Source Control: Git & Mercurial.
	Cloud: Salesforce, AWS and Digital Ocean.
	Methodologies: Agile, SCRUM.
*/

const SkillsSection = () => {
	// Animate the Console Pipe
	useEffect(() => {
		const pipeAnimation = setInterval(() => document.querySelector('#pipe').classList.toggle('hide'), 500);
		return () => clearInterval(pipeAnimation);
	}, []);

	return (
		<section className="skills-section section">

			<h2 className="section-title">
				<Icon icon={faRocket} />
				{' '}Skills &amp; Proficiency
			</h2>

			<div className="skillset console">
				<p>
					<b>$</b> Languages <br />
					JavaScript, ES6/7, TypeScript, C#, Apex, Python, HTML, CSS, Java, PHP, SQL and T-SQL
				</p>

				<p>
					<b>$</b> Operating_Systems <br />
					Linux, Windows
				</p>

				<p>
					<b>$</b> Frameworks_Tools <br />
					NodeJS, ExpressJS, KoaJS, ReactJS, AngulaJS, jQuery, Entity Framework, WebAPI, ASP.NET MVC, Bootstrap, Material
					Design, CodeIgniter, Ngnix, Apache, Webpack, Jenkins, TDD
				</p>

				<p>
					<b>$</b> Databases <br />
					MongoDB, MySQL, MSSQL, SQLite and Oracle
				</p>

				<p>
					<b>$</b> Modeling <br />
					Relational and NoSQL databases
				</p>

				<p>
					<b>$</b> Source_Control <br />
					Git &amp; SVN
				</p>

				<p>
					<b>$</b> Cloud <br />
					Salesforce, Amazon Web Services, Heroku, Digital Ocean
				</p>

				<p>
					<b>$</b> Methodologies <br />
					Agile, SCRUM and Waterfall
				</p>

				<p id="typingArea">
					annon@andrese03.me:&nbsp;<b id="pipe">|</b>
				</p>

			</div>

		</section>
	)
};

export default SkillsSection;
