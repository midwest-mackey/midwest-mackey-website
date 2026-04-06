import { Component, OnInit } from '@angular/core';
import { Skill, Certificate, Education } from './skill.model';
import { faChartSimple, faCode, faCircle, faUsers, faChess, faSwatchbook, faPencilRuler, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import { GlobalConstants } from 'src/app/app.constants';
import { faGithub } from '@fortawesome/free-brands-svg-icons';


@Component({
  selector: 'mm-what-i-do',
  templateUrl: './what-i-do.html',
  styleUrl: './what-i-do.scss',
  standalone: false,
})
export class WhatIDo implements OnInit {

  faCircle = faCircle;
  faCode = faCode;
  faUsers = faUsers;
  faChess = faChess;
  faChartSimple = faChartSimple;
  faSwatchbook = faSwatchbook;
  faPencilRuler = faPencilRuler;
  faCalendar = faCalendarCheck;
  faGithub = faGithub;

  emailAddress = GlobalConstants.emailAddress;
  githubRAWBaseURL = GlobalConstants.githubRAWBaseURL;
  gitbhubBaseURL = GlobalConstants.githubBaseURL;

  userExperience: Skill[] = [
    {
      firstWord: 'Design & Research',
      bodyCopy: 'to create a modern, clean, and intuitive experiences that meet the needs of users and the business',
      icon: this.faUsers,
    },
    {
      firstWord: 'Problem Solving & Strategy',
      bodyCopy: 'to identify and solve complex design problems and to develop strategies for creating successful products',
      icon: this.faChess,
    },
    {
      firstWord: 'Analytics & Optimization',
      bodyCopy: 'using Google Analytics, Hotjar, and other tools to identify opportunities for optimization and measure the impact of design changes',
      icon: this.faChartSimple,
    },
    {
      firstWord: 'Mockups & Prototyping',
      bodyCopy: 'to quickly iterate on design ideas and to communicate design concepts to stakeholders and developers',
      icon: this.faPencilRuler,
    },
    {
      firstWord: 'Code & Developement',
      bodyCopy: 'to understand the technical implications of design decisions and to create prototypes and proof of concepts to validate design ideas',
      icon: this.faCode,
    },
    {
      firstWord: 'Design Systems & Component Libraries',
      bodyCopy: 'to create a consistent and cohesive user experience across all products and platforms',
      icon: this.faSwatchbook,
    },
  ];
  certifications: Certificate[] = [
    {
      name: 'UX Certification',
      issuer: 'NN/Group',
      issueDate: '2016-09-05',
      id: '1008666',
      url: 'https://www.nngroup.com/ux-certification/people',
      certURL: this.gitbhubBaseURL + '/share/blob/main/Certificates/NNG/NNG-1008666-Mackey.pdf',
      image: '/assets/certifications/nng-banner.png',
      logo: '/assets/certifications/nng-logo.jpg',
    },
    {
      name: 'UX Certification',
      issuer: 'IxDF',
      issueDate: '2017, 2024',
      id: '171726',
      url: 'https://ixdf.org/members/cmackey/certificate/membership',
      certURL: this.gitbhubBaseURL + '/share/blob/main/Certificates/IxDF/certificate-ixdf-membership.jpg',
      image: '/assets/certifications/ixdf-banner.jpg',
      logo: '/assets/certifications/ixdf-logo.jpg'
    },
    {
      name: 'Object-Oriented UX Fundamentals Certification',
      issuer: 'Udemy',
      issueDate: '2023-24-05',
      id: '0004',
      url: 'https://www.udemy.com/certificate/UC-44550e75-10f2-4b53-9738-bb0c69613a72/',
      certURL: this.gitbhubBaseURL + '/share/blob/main/Certificates/Udemy/UC-44550e75-10f2-4b53-9738-bb0c69613a72-Mackey.jpg',
      image: '/assets/certifications/ooux-banner.jpg',
      logo: '/assets/certifications/udemy-logo.jpg'
    },
    {
      name: 'Platinum Developer',
      issuer: 'LaunchDarkley',
      issueDate: '2023-24-05',
      id: 'afhnbcm9q2ea',
      url: 'https://verify.skilljar.com/c/afhnbcm9q2ea',
      certURL: this.gitbhubBaseURL + '/share/blob/main/Certificates/LaunchDarkly/4%20launchdarkly-platinum-developer-certificate.pdf',
      image: '/assets/certifications/launchdarkly-banner.jpg',
      logo: '/assets/certifications/launchdarkly-logo.jpg'
    },
    {
      name: 'Google Analytics Certified',
      issuer: 'Google Digital Academy',
      issueDate: '2026',
      id: '177467861',
      url: 'https://skillshop.credential.net/ae5dea71-e167-4ee7-a683-cd3cf4c65b81#acc.HWkf71vZ',
      certURL: this.gitbhubBaseURL + '/share/blob/main/Certificates/Skillshop/GA2026.pdf',
      image: '/assets/certifications/google-banner.jpg',
      logo: '/assets/certifications/google-logo.jpg'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }
}

