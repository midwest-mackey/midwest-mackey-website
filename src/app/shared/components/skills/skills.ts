import { Component, OnInit } from '@angular/core';
import { Skill } from './skill.model';
import { faArrowRight, faChartLine, faCircle, faCode, faPaperPlane, faPencilRuler, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';


@Component({
  selector: 'mm-skills',
  templateUrl: './skills.html',
  styleUrl: './skills.scss',
  standalone: false,
})
export class Skills implements OnInit {

  faArrowRight = faArrowRight;
  faCircle = faCircle;
  faPaperPlane = faPaperPlane;
  faPencilRuler = faPencilRuler;
  faCode = faCode;
  faChartLine = faChartLine;
  faToolbox = faToolbox;

  emailAddress = GlobalConstants.emailAddress;

  skills: Skill[] = [
    {
      type: 'User Experience Design & Research',
      bodyCopy: 'Our design team is comprised of multiple designers with backgrounds in visual and interaction design, research methodologies, communication, psychology, and front-end development. The team works closely with our developers on the team to leverage additional development expertise, as needed.',
      icon: this.faPencilRuler,
      capabilities: [
        {
          groupTitle: 'Customer Research',
          groupServices: [
            { item: 'Surveys' },
            { item: 'Interviews' },
            { item: 'Contextual Inquiries' },
            { item: 'User Testing' },
            { item: 'Journey Maps' },
          ]
        },
        {
          groupTitle: 'Analysis',
          groupServices: [
            { item: 'SWOT Analysis' },
            { item: 'Heuristic Evaluation' },
            { item: 'Analytics' },
            { item: 'Benchmarking' },
          ]
        },
        {
          groupTitle: 'Ideation',
          groupServices: [
            { item: 'Workshops' },
            { item: 'Minimal Viable Product Kickoffs' },
            { item: 'White Boarding Session' },
            { item: 'Card Sorting' },
            { item: 'Affinity Diagramming' },
          ]
        },
        {
          groupTitle: 'Design',
          groupServices: [
            { item: 'Low-Fidelity Wireframes' },
            { item: 'High-Fidelity Mockups', link: '/mockups' },
            { item: 'Interactive Prototypes', link: '/prototypes' },
          ]
        },
      ]
    },

    {
      type: 'Development',
      bodyCopy: 'Our development team is comprised of multiple developers with disciplines in both front-end and back-end technologies. Our developers have a fundamental understanding of the UX methodologies, principles, and experience working with designers in the product development lifecycle to be an integral part in delivering the best possible solutions.',
      icon: this.faCode,
      capabilities: [
        {
          groupTitle: 'Front End',
          groupServices: [
            { item: 'Angular' },
            { item: 'React' },
            { item: 'JS' },
            { item: 'HTML' },
            { item: 'Bootstrap' },
            { item: 'Tailwinds' },
            { item: 'CSS, SCSS, LESS' },
          ]
        },
        {
          groupTitle: 'Back End',
          groupServices: [
            { item: '.Net Core' },
            { item: '.Net Framework 5.0' },
            { item: 'Docker' },
            { item: 'Kubernetes' },
            { item: 'Web API' },
            { item: 'WSO2 API Gateway' },
            { item: 'SQL Server' },
            { item: 'SharePoint' },
            { item: 'Elasticsearch' },
          ]
        },
        {
          groupTitle: 'Other',
          groupServices: [
            { item: 'Splunk (for centralized logging and monitoring)' },
            { item: 'AppDynamics f(or application performance management)' },
            { item: 'CI/CD using Bamboo & Bitbucket.' },
          ]
        },
      ]
    },
    {
      type: 'Analytics',
      bodyCopy: 'Our team specializes in implementing, managing, and analyzing data through everything Google Marketing tools has to offer. Our team primarily focuses on implementing tools to focus on gathering analytics data and using that information to provide data driven decision making for an improved end user experience.',
      icon: this.faChartLine,
      capabilities: [
        {
          groupTitle: 'Google Analytics',
          groupServices: [
            { item: 'Get deeper understanding of your end users' },
            { item: 'Understand how users interact with your site' },
            { item: 'See how many users are utilizing your site' },
            { item: 'Learn what features get used the most' },
            { item: 'Data views to meet your needs' },
            { item: 'Access for the entire team to view' },
            { item: 'Multiple reporting tools' },
            { item: 'Data Analysis and Visualization' },
            { item: 'Data Collection and Management' },
            { item: 'Additional Integrations available' },

          ]
        },
        {
          groupTitle: 'Google Tag Manager',
          groupServices: [
            { item: 'Customize Analytics Tracking' },
            { item: 'Supports websites, mobile apps, and server side' },
            { item: 'Manage detailed tracking with no additional code' },
            { item: 'Get better understanding of your sites used features' },
            { item: 'Integrates with Google Analytics for seamless data flow' },
            { item: 'Supports page loads, link clicks, form submits, and much more' },
            { item: 'Supports custom data parameters' },
            { item: 'Measure across domains' },
            { item: 'Understand user identification' },
          ]
        },
      ]
    },
    {
      type: 'Resources',
      bodyCopy: 'Our team offers a variety of resources to take advantage of and are the same resources we utilize when engaging with your team or building our own services. These resources are another service we provide to help speed up the development and design process and continue to provide mothods of unifying the overall experience.',
      icon: this.faToolbox,
      capabilities: []
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

