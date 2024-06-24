RoamAgro

A web application that displays weekly local market prices of major agro produce within  a geographic area.

TEAM
This project is done by Mukhtar Salihu; an aspiring full stack web developer with foundations in python and javascript. With the support of mentors and peers, he is focused on building both the backend and frontend of the project.

TECHNOLOGIES

FRONTEND

React: To create dynamic and responsive user interfaces.

Material-UI: For a consistent and modern design.

Alternative: Vue.js

Trade-off: React is highly flexible and can be used in various contexts, including web, mobile (React Native), and even VR (React VR) compared to Vue.js

BACKEND

Python with Django: Python is known for its simplicity and readability. Django A high-level Python web framework that encourages rapid development and clean, pragmatic design; making it a  great choice for backend development.

Alternative: Python with flask

Adaptation: Using Python/Flask as an alternative provided a pragmatic balance of simplicity and capability to meet the project's goals effectively.

Trade-off: Django includes an ORM and is more feature-complete compared to Flask.

DATABASE

PostgreSQL: For storing the price data.

Alternative: MySQL

Trade-off: PostgreSQL provides better performance and features than MySQL

CHALLENGE

PROBLEM: The lack of a platform that provides current local market prices of major agro produce makes it difficult for most consumers and traders to make price comparisons while transacting. RoamAgro is a web application that displays weekly local market prices of major agro produce within  a geographic area that makes price comparison easy. 

PROBLEM IT’S NOT SOLVING: RoamAgro does not provide daily market prices of agro produce which will be more accurate for price comparison.

WHO ROAMAGRO IS HELPING: Agro produce consumers and traders that rely on these local market prices to make price comparisons and get the best rates for transacting within their own communities.

ROAMAGRO USERS

Agro produce consumers
Commodity traders

ROAMAGRO DEPENDENCE ON SPECIFIC LOCALE: This portfolio project depends on the selected geographic area as the prices of these commodities vary with changing geographic location.

RISKS

TECHNICAL RISKS, POTENTIAL IMPACTS AND ALTERNATIVES
Data Inconsistency and Accuracy
Risk: Inconsistent or inaccurate data from the data source.
Impact: Users may lose trust in the application if the data displayed is incorrect or outdated.
Safeguard: Implement data validation and verification processes. Use multiple data sources and cross-check the data for accuracy.
Deployment and Infrastructure
Risk: Issues with deployment and scaling the application infrastructure.
Impact: Downtime, performance degradation, and increased operational costs.
Safeguard: Use containerization (Docker) and orchestration tools (Kubernetes) for easier deployment and scaling. Implement continuous integration and continuous deployment (CI/CD) pipelines.

NON TECHNICAL RISKS, POTENTIAL IMPACTS AND PREVENTION STRATEGIES
Market Demand and User Adoption
Risk: The application may not attract enough users or meet the target market's needs.
Impact: Low user adoption can lead to the project's failure, wasting time and resources.
Prevention Strategy: Conduct thorough market research and user surveys before development. Implement feedback loops during beta testing to ensure the application meets user needs.
User Engagement and Retention
Risk: Low user engagement and retention due to poor user experience or lack of compelling features.
Impact: Decreased user base and potential failure of the application.
Prevention Strategy: Focus on creating a user-friendly interface and valuable features. Regularly update the application based on user feedback and engagement analytics.

INFRASTRUCTURE
BRANCHING AND MERGING: At this stage of development, there is no need for branching and merging since the project is done by one individual. Subsequently, GitHub flow will be followed.

DEPLOYMENT STRATEGY
Continuous integration and continuous deployment (CI/CD) pipelines will be implemented using GitHub Actions to ensure RoamAgro is is continuously integrated, tested, and deployed.

APP DATA POPULATION
Initial data seedling using a script to populate the app with sample data for testing purposes, ensuring a realistic environment for development. Subsequently use multiple reliable data sources and establish partnerships with trusted organisations.

TESTING
Unit Testing: pytest or unittest will be used to ensure individual pieces of code work correctly.
Integration Testing: Ensure different parts of the application work together.

EXISTING SOLUTIONS
SIMILAR PRODUCTS
Australian Department of Agriculture: Their weekly commodity price updates provide detailed charts and statistics on global and domestic agricultural markets. They cover a wide range of commodities including grains, livestock, and horticultural products. This could inform the types of data visualisations and reporting frequency to implement​ (https://www.agriculture.gov.au/abares/data/weekly-commodity-price-update).

SIMILARITIES
Both provide weekly price updates for agro produce.

DIFFERENCES
RoamAgro focuses only on local markets within selected geographic area.
