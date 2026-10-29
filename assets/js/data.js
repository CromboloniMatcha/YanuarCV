/* All site content lives here. Edit this file only. */
window.CV={
 name:'Yanuar Noor Wicaksono',
 email:'yanuarnoorwicaksono@gmail.com',
 cvFile:'assets/docs/Yanuar_CV.pdf',
 links:[{l:'GitHub',u:''},{l:'LinkedIn',u:''}], // add URLs to show them
 skillMatrix:{Python:85,SQL:70,Excel:75,'Machine Learning':75,NLP:70,Visualization:80,'Web Dev':80,English:85}, // adjust to your real level
 about:'An enthusiastic Informatics Engineering student with a passion for continuous learning. Experienced in project management for web development teams, with an internship at the Azura Labs software house. Proficient in English, with extensive experience collaborating with international stakeholders.',
 operators:[
  {code:'OP-01',short:'Analyst',class:'PRIMARY // ANALYSIS',title:'Data Analyst',desc:'Turns raw data into clear answers with Excel, SQL and interactive dashboards built in Plotly and Shiny.',stats:{Analysis:85,Visualization:80,SQL:70,'Business Intel':70},skills:['Excel','SQL','Plotly','Shiny','Business Intelligence']},
  {code:'OP-02',short:'Scientist',class:'SPECIALIST // MODELLING',title:'Data Scientist',desc:'Builds machine learning and NLP models in Python, from data preparation to evaluation.',stats:{Python:85,'Machine Learning':75,NLP:70,Statistics:65},skills:['Python','Machine Learning','NLP','Google AI Quest']},
  {code:'OP-03',short:'Developer',class:'SUPPORT // ENGINEERING',title:'Web Developer',desc:'Full stack internship at Azura Labs: responsive web pages and system design with UML.',stats:{Frontend:80,Backend:65,'UML Design':75,Teamwork:85},skills:['HTML','CSS','JavaScript','UML','Responsive UI']},
  {code:'OP-04',short:'Liaison',class:'COORDINATOR // GLOBAL',title:'Global Liaison',desc:'Fluent working English. Hosted international guests and supported MOU drafting at the campus International Office.',stats:{English:85,Coordination:85,Communication:85,Events:80},skills:['English','MOU Drafting','Event Coordination','Stakeholders']}
 ],
 experience:[
  {year:'2025',status:'COMPLETED',title:'Full Stack Developer Internship',org:'Azura Labs',pts:['Coordinated team workflows and project delivery.','Designed and mapped system architectures using UML diagrams.','Developed and optimized responsive web pages.']},
  {year:'2023-2025',status:'COMPLETED',title:'Volunteer, International Office and Affairs',org:'Campus',pts:['Managed and assisted international guests, including students, lecturers and visiting staff.','Facilitated the drafting and processing of Memorandums of Understanding (MOU).','Organized and coordinated international events and activities.']}
 ],
 education:[{y:'2022 - Current',t:'S1 Informatics Engineering',o:'Universitas PGRI Semarang'},{y:'2019 - 2022',t:'SMA St. Bernardus',o:'Pekalongan'}],
 certs:['Python Programming Course','SQL Programming Course','Excel Intermediate','Student Buddies Certificate','Innovators Intermediate AI Quest by Google Developer'],
 /* url opens in a new tab on another domain. Replace the placeholders. img is optional (e.g. assets/img/p1.jpg). */
 projects:[
  {title:'M5 Demand Forecasting',type:'DATA ANALYSIS',summary:'Forecast daily unit sales per product and store, then turn the forecasts into inventory decisions (safety stock, reorder points) and compare the cost of stockouts and overstock against a simple baseline.',tags:['Python'],url:'https://github.com/CromboloniMatcha/M5-Demand-Forecasting-Project',img:'assets/img/output.png'},
  {title:'Movies reccomendation',type:'MACHINE LEARNING',summary:'A model that give movies reccomendation based on user algorithm',tags:['Python','NLP', 'IN PROGRESS'],url:'https://github.com/touchme14/movies_recommendation_csv',img:'sap.png'},
  {title:'Sapio Lab',type:'WEB',summary:'A game that could help develop kid, teenager , to young people develop their intellect',tags:['HTML','CSS','JS'],url:'https://sapiolab.vercel.app/',img:'assets/img/sapioo.jpg'},
  {title:'Mental Health Detectionr',type:'Machine Learning',summary:'A model that help detecting sign of Mental Health problem based on chat',tags:['Python','NLP','Random Forest'],url:'https://github.com/touchme14/Mental-Health-Beta',img:'assets/img/mental.png'},
  {title:'IN PROGRESS',type:'IN PROGRESS',summary:'IN PROGRESS',tags:['IN PROGRESS'],url:'https://example.com',img:''}
 ]
};
