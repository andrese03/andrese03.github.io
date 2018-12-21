import React, { useEffect } from 'react';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faPhone, faEnvelope, faUser ,faBriefcase ,faArchive ,faCogs ,faHeart} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';

import 'typeface-roboto';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles-3.css';
import './css/main.css';

import ExperienceItem from './components/ExperienceItem/ExperienceItem';
import SkillsSection from './components/SkillsSection/SkillsSection';
import AnimatedDots from './components/AnimatedDots/AnimatedDots';

import profile from './images/profile.jpg'
import unicorn from './images/unicorn.png';
import './App.scss';

library.add(fab)

const App = () => {

	// Effect to define
	useEffect(() => {
		// 	/*======= Skillset *=======*/
		// 	$('.level-bar-inner').css('width', '0');
		// 	$(window).on('load', function () {
		// 		$('.level-bar-inner').each(function () {
		// 			var itemWidth = $(this).data('level');
		// 			$(this).animate({
		// 				width: itemWidth
		// 			}, 800);
		// 		});
		// 	});
	}, []);

  return (
		<>
			<div className="wrapper">
				<div className="sidebar-wrapper">
					<div className="profile-container">
						<img className="profile" src={profile} alt="profile" />
						<h1 className="name">Andrés Encarnación</h1>
						<h3 className="tagline">Web Developer</h3>
					</div>
					{/* <!--//profile-container--> */}

					<div className="contact-container container-block">
						<ul className="list-unstyled contact-list">
							<li className="email"><Icon icon={faEnvelope} /> <a href="mailto: andresencarnacion03@gmail.com">andresencarnacion03@gmail.com</a></li>
							<li className="phone"><Icon icon={faPhone}/> <a href="tel:+1 829-918-4981">+1 829-918-4981</a></li>
							{/* <!-- <li className="website"><Icon icon={faGlobe}/> <a href="http://themes.3rdwavemedia.com/website-templates/free-responsive-website-template-for-developers/" target="_blank">portfoliosite.com</a></li> --> */}
							<li className="linkedin"><Icon icon={['fab', 'linkedin']} /> <a href="https://linkedin.com/in/andres-encarnacion" target="_blank">linkedin.com/in/andres-encarnacion</a></li>
							<li className="github"><Icon icon={['fab', 'github']} /> <a href="https://github.com/andrese03" target="_blank">github.com/andrese03</a></li>
							<li className="twitter"><Icon icon={['fab', 'twitter']} /> <a href="https://twitter.com/andrese03" target="_blank">@andrese03</a></li>
						</ul>
					</div>
					{/* <!--//contact-container--> */}
					<div className="education-container container-block">
						<h2 className="container-block-title">Education</h2>
						<div className="item">
							<h4 className="degree">Degree in Systems Engineering</h4>
							<h5 className="meta">UNAPEC</h5>
							<div className="time">2011-2018</div>
						</div>
						{/* <!--//item--> */}
						<div className="item">
							<h4 className="degree">Software Developer</h4>
							<h5 className="meta">INFOTEP</h5>
							<div className="time">2013 - 2014</div>
						</div>
						{/* <!--//item--> */}
					</div>
					{/* <!--//education-container--> */}

					<div className="languages-container container-block">
						<h2 className="container-block-title">Languages</h2>
						<ul className="list-unstyled interests-list">
							<li>Spanish <span className="lang-desc">(Native)</span></li>
							<li>English <span className="lang-desc">(Professional)</span></li>
							<li>Portuguese <span className="lang-desc">(Reading and Writting)</span></li>
						</ul>
					</div>
					{/* <!--//interests--> */}

					<div className="interests-container container-block">
						<h2 className="container-block-title">Interests</h2>
						<ul className="list-unstyled interests-list">
							<li>Coding</li>
							<li>Photography</li>
							<li><s>Unicorns</s></li>
							<li>Drawing</li>
						</ul>
					</div>
					{/* <!--//interests--> */}

				</div>
				{/* <!--//sidebar-wrapper--> */}

				<div className="main-wrapper">

					<section className="section summary-section">
						<h2 className="section-title"><Icon icon={faUser} /> About me<AnimatedDots/></h2>
						<div className="summary">
							<p>
								Code lover with 4 years working as Software Developer in software companies and particular projects of different
								areas.
								Specializes in JavaScript, C# and Apex code. Has strong knowledge of the softare development cycle, agile
								methodologies, best software
								practices and architecture patterns. Has skills to lead software projects; gatherizing requirements and
								establishing guidelines and
								support for the developers. Capable to work as a team member as well as individually and always open to learn new
								things. Always focused on deliver with the best quality for the
								end users.
							</p>
						</div>
						{/* <!--//summary--> */}
					</section>
					{/* <!--//section--> */}

					<section className="section experiences-section">
						<h2 className="section-title"><Icon icon={faBriefcase}/> Experiences</h2>

						<ExperienceItem
							title="Software Engineer"
							startDate="mar. 2018"
							endDate="dec. 2018"
							company="Instacarro"
							location="São Paulo, Brazil"
							description={
								<>
									Worked on an Agile Environment by developing requirements based on the business' needs.<br />
									Collaborate on a migration project of a Legacy System to reduce the software development time and improve the system's performance.<br />
									Developed custom code to facilitate reporting and enhanced security on a Salesforce Platform and its integrations with other Systems.
								</>
							}
						/>

						<div className="item">
							<div className="meta">
								<div className="upper-row">
									<h3 className="job-title">Software Engineer</h3>
									<div className="time">mar. 2018 - dec. 2018 </div>
								</div>
								{/* <!--//upper-row--> */}
								<div className="company">Instacarro, São Paulo, Brazil</div>
							</div>
							{/* <!--//meta--> */}
							<div className="details">
								<p>
								
								</p>
							</div>
							{/* <!--//details--> */}
						</div>
						{/* <!--//item--> */}

						<div className="item">
							<div className="meta">
								<div className="upper-row">
									<h3 className="job-title">Senior Software Engineer</h3>
									<div className="time">apr. 2018 - oct. 2018 </div>
								</div>
								{/* <!--//upper-row--> */}
								<div className="company">Health Care Fiscal Management Inc., United States</div>
							</div>
							{/* <!--//meta--> */}
							<div className="details">
								<p>
									Gather/analyze internal customer needs to write technical requirements according to the business needs.<br/>
									Created a Software to migrate data from legacy systems to improve the quality of the data and avoid manually loads by users, reducing costs and time by 70%.<br/>
									Build a Web Services platform to allow clients to access to the data of some of the internal systems.
								</p>
							</div>
							{/* <!--//details--> */}
						</div>
						{/* <!--//item--> */}

						<div className="item">
							<div className="meta">
								<div className="upper-row">
									<h3 className="job-title">Senior Web Developer</h3>
									<div className="time">mar. 2017 - sept. 2018 </div>
								</div>
								{/* <!--//upper-row--> */}
								<div className="company">SoftDev R.D. Santo Domingo, R.D.</div>
							</div>
							{/* <!--//meta--> */}
							<div className="details">
								<p>
									Worked on an internal ERP Solutions with a small team of four members by using Agile methodologies. <br/>
									Discussed, analyzed and strategized product design with the Product Manager and Business Manager. <br/>
									Created a solution based of the business needs and the software design specifications.
								</p>
							</div>
							{/* <!--//details--> */}
						</div>
						{/* <!--//item--> */}

						<div className="item">
							<div className="meta">
								<div className="upper-row">
									<h3 className="job-title">Outsourcing Software Engineer for Verizon</h3>
									<div className="time">dec. 2016 - mar. 2018</div>
								</div>
								{/* <!--//upper-row--> */}
								<div className="company">Newtech, Santo Domingo, D.R.</div>
							</div>
							{/* <!--//meta--> */}
							<div className="details">
								<p>
									Worked as an Outsourcing Software Engineer for Verizon, U.S.<br/>
									Write code for a Salesforce Platform based of business needs to improve internal processes.<br/>
									Design and re-factored internal applications from Salesforce Classic to Salesforce Lightning Experience.<br/>
									Write software test cases and documentation for built components.
								</p>
							</div>
							{/* <!--//details--> */}
						</div>
						{/* <!--//item--> */}

						<div className="item">
							<div className="meta">
								<div className="upper-row">
									<h3 className="job-title">Software Developer / Lead Developer</h3>
									<div className="time">apr. 2014 - dec. 2016</div>
								</div>
								{/* <!--//upper-row--> */}
								<div className="company">Simétrica Consulting, Santo Domingo, D.R.</div>
							</div>
							{/* <!--//meta--> */}
							<div className="details">
								<p>
									Create complex and large full stack JavaScript and C# applications. Responsible of migrate data and applications
									built using Oracle Forms to a fullstack enviroment using MongoDB, ExpressJS and AngularJS. Also leading small teams of developers
									to build Javascript and C# large applications ensuring the best quality to the end users.
								</p>
							</div>
							{/* <!--//details--> */}
						</div>
						{/* <!--//item--> */}

					</section>
					{/* <!--//section--> */}

					<section className="section projects-section">
						<h2 className="section-title"><Icon icon={faArchive}/> Projects</h2>
						<div className="intro">
							<p>These section includes a high detail of some personal or companies's projects:</p>
						</div>
						{/* <!--//intro--> */}
						<div className="item">
							<span className="project-title"><a href="https://softdevmanager.herokuapp.com/" target="_blank">ERP System</a></span>
							-
							<span className="project-tagline">A lightweight ERP system oriented to local small and medium business.</span>
						</div>
						{/* <!--//item--> */}
						<div className="item">
							<span className="project-title"><a href="https://mediawatch.com.do/" target="_blank">Media Watch</a></span> -
							<span className="project-tagline">Colaborate as Developer Lead to build a social media tool designed to support the
								internal company's processes.</span>
						</div>
						{/* <!--//item--> */}
						<div className="item">
							<span className="project-title"><a href="https://medicalcore.net/" target="_blank">Health Care Application</a></span>
							-
							<span className="project-tagline">Part of the initial developers of this project to build an application capable of
								automate many Health Care processes for small, medium and large business. </span>
						</div>
						{/* <!--//item--> */}
						<div className="item">
							<span className="project-title"><a href="http://www.plastilap.com/" target="_blank">Plastilap</a></span> -
							<span className="project-tagline">Worked as main developer responsive to build the website with the aim to promote Dr.
								Lapaix's services. </span>
						</div>
						{/* <!--//item--> */}
					</section>
					{/* <!--//section--> */}

					<SkillsSection />

				</div>
			</div>

			<img id="unicorn" src={unicorn} alt="unicorn" />

			<footer className="footer">
				<div className="text-center">
					<small className="copyright">
						This template is released under the Creative Commons Attribution 3.0 License. Designed with	<Icon icon={faCogs}/> and <Icon icon={faHeart}/> 
					</small>
				</div>
				{/* <!--//container--> */}
			</footer>
			{/* <!--//footer--> */}
		</>
  );
}

export default App;
