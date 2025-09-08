# Email Request to Waterloo API Team

**Subject:** Request for CORS Policy Adjustment for Student Study Group Application

---

**To:** Waterloo API Support Team  
**From:** [Your Name]  
**Date:** [Current Date]

Dear Waterloo API Support Team,

I hope this email finds you well. I am writing to request assistance with accessing the Waterloo Open Data API for a student project I am developing.

## Project Overview

I am currently developing **StuddyBuddy**, a web application designed to help University of Waterloo students connect and form study groups. The application aims to:

- Facilitate study group formation among UW students
- Provide easy access to course information and campus locations
- Enhance the academic experience for our student community

## Technical Request

My application requires access to the following Waterloo Open Data API endpoints:
- `/v3/Subjects` - To populate course subject dropdowns
- `/v3/Locations` - To provide campus building/location options
- `/v3/Courses/{term}` - To display course information

## Current Issue

The application is currently blocked by CORS (Cross-Origin Resource Sharing) policy when making direct requests from the browser to `https://openapi.data.uwaterloo.ca`. This is preventing the application from functioning properly in development.

## Proposed Solutions

I would like to request one of the following solutions:

1. **CORS Headers Addition**: Add appropriate CORS headers to allow requests from `http://localhost:4200` (development) and my production domain
2. **API Key Enhancement**: If there's a way to configure CORS permissions through the API key system
3. **Alternative Access Method**: Guidance on the recommended approach for student projects

## Project Details

- **Application Type**: Student study group platform
- **Target Users**: University of Waterloo students
- **Development Status**: Currently in development phase
- **API Usage**: Educational/non-commercial use only
- **Expected Traffic**: Low volume (student project)

## Compliance Commitment

I commit to:
- Using the API responsibly and within rate limits
- Following all terms of service
- Using the data only for the stated educational purpose
- Properly attributing the Waterloo Open Data API

## Contact Information

- **Name**: [Your Full Name]
- **Email**: [Your Email]
- **Student ID**: [Your Student ID if applicable]
- **Program**: [Your Program]
- **Project Repository**: [GitHub link if you want to share]

I understand that this request may require review and approval. I am happy to provide additional information about the project or discuss alternative approaches if needed.

Thank you for your time and consideration. I look forward to hearing from you.

Best regards,  
[Your Name]  
[Your Contact Information]

---

**P.S.** This project is part of my learning journey in web development and aims to contribute positively to the UW student community. Any assistance you can provide would be greatly appreciated.
