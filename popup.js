const courses = [
  {code:"EEX3467",title:"Software Engineering Concepts and Programming",prereq:"",sem:"1",type:"compulsory", credits: 3},
  {code:"EEI3346",title:"Web Application Development",prereq:"",sem:"1",type:"compulsory", credits: 3},
  {code:"EEI3266",title:"Information Systems and Data Management",prereq:"",sem:"1",type:"compulsory", credits: 3},
  {code:"AGM3263",title:"Communication Skills",prereq:"",sem:"1 & 2",type:"compulsory", credits: 2},
  {code:"MHZ3459",title:"Basic Mathematics for Computing",prereq:"MHZ2250(CA)",sem:"1 & 2",type:"compulsory", credits: 3},
  {code:"EAP",title:"English for Academic Purposes",prereq:"",sem:"before & in Sem 1",type:"compulsory", credits: 0},
  {code:"EEI3262",title:"Introduction to Object-Oriented Programming",prereq:"",sem:"2",type:"compulsory", credits: 3},
  {code:"EEX3373",title:"Communication and Computer Technology",prereq:"AGM3263(CR), EEX3467(CR)",sem:"1 & 2",type:"compulsory", credits: 3},
  {code:"EEI4346",title:"Web Technology",prereq:"EEI3346(CR)",sem:"2",type:"compulsory", credits: 3},
  {code:"EEI3269",title:"Introduction to Mobile Application Development",prereq:"",sem:"2",type:"elective", credits: 2},
  {code:"EEM3366",title:"Introduction to Business Studies",prereq:"",sem:"2",type:"elective", credits: 2},
  {code:"EEI3372",title:"Programming in Python",prereq:"",sem:"1",type:"elective", credits: 2},
  {code:"EEI4267",title:"Requirement Engineering",prereq:"EEX3467(P)",sem:"3",type:"compulsory", credits: 3},
  {code:"EEX4465",title:"Data Structures and Algorithms",prereq:"EEX3373(CA), MHZ4256(CR), Pass in 15 credits",sem:"3",type:"compulsory", credits: 4},
  {code:"MHZ4256",title:"Mathematics for Computing",prereq:"MHZ2250(P) or MHZ3459(CA)",sem:"3",type:"compulsory", credits: 3},
  {code:"EEI4362",title:"Object-Oriented Design",prereq:"EEI3262(CA), EEX3467(CA), Pass in 15 credits",sem:"4",type:"compulsory", credits: 3},
  {code:"EEI4361",title:"User Experience Engineering",prereq:"EEX3467(CA), Pass in 15 credits",sem:"4",type:"compulsory", credits: 3},
  {code:"EEI4366",title:"Data Modelling and Database Systems",prereq:"EEI3266(CA), Pass in 15 credits",sem:"4",type:"compulsory", credits: 3},
  {code:"AGM4367",title:"Economics and Marketing for Engineers",prereq:"Pass in 18 credits at Level 3",sem:"4",type:"compulsory", credits: 2},
  {code:"EEY4189",title:"Software Design in Group",prereq:"EEX3467(P), {EEI3262(CA) or EEI3269(CA)}, Pass in 20 credits at Level 3",sem:"3 & 4",type:"compulsory", credits: 4},
  {code:"MHZ4377",title:"Applied Statistics",prereq:"MHZ3459(CA), Pass in 15 credits at level 3",sem:"4",type:"compulsory", credits: 3},
  {code:"EEI5467",title:"Software Testing and Quality Assurance",prereq:"EEX3467(P), 20 credits pass",sem:"3",type:"compulsory", credits: 3},
  {code:"EEI4369",title:"Mobile Application Development for Android",prereq:"EEI3269(CR)",sem:"3",type:"elective", credits: 3},
  {code:"EEX4373",title:"Data Science",prereq:"EEI4366(CR), EEI3266(CA), Pass in 20 credits",sem:"3",type:"elective", credits: 3},
  {code:"LLJ3265",title:"Introduction to Laws of Sri Lanka",prereq:"",sem:"4",type:"elective", credits: 2},
  {code:"MHJ4271",title:"History of Technology",prereq:"Pass in 20 credits",sem:"3 & 4",type:"elective", credits: 2},
  {code:"EEI5270",title:"Information Security",prereq:"EEX3467(P), EEX4465(P), pass in 30 credits",sem:"5",type:"compulsory", credits: 3},
  {code:"EEX5563",title:"Computer Architecture and Operating Systems",prereq:"EEX3373(P), Pass in 36 credits",sem:"5 & 6",type:"compulsory", credits: 4},
  {code:"EEW5811",title:"Industrial Training – Software",prereq:"EEX3467(P), EEI4362(P), EEX4465(P), Pass in 40 credits",sem:"5 & 6",type:"compulsory", credits: 6},
  {code:"CVM5402",title:"Accounting for Engineers",prereq:"AGM4367(CA), Pass in 30 credits",sem:"5 & 6",type:"compulsory", credits: 2},
  {code:"MHZ5375",title:"Discrete Mathematics",prereq:"MHZ4256(CA), MHZ3459(P)",sem:"6",type:"compulsory", credits: 3},
  {code:"EEX5362",title:"Performance Modelling",prereq:"Pass in 40 credits, EEI3346(P), MHZ4377(P)",sem:"6",type:"compulsory", credits: 3},
  {code:"MHJ5372",title:"Technology, Society and Environment",prereq:"Pass in 45 credits",sem:"5 & 6",type:"compulsory", credits: 2},
  {code:"EEY6189",title:"Research Methodology and Project Identification",prereq:"EEX4465(P), Pass in 60 credits",sem:"5",type:"compulsory", credits: 3},
  {code:"EEX5376",title:"Embedded Systems and Internet of Things",prereq:"EEI3266(P), EEI3372(P), AGM3263(P), EEX3373(P)",sem:"6",type:"elective", credits: 3},
  {code:"EEX5464",title:"Data Communication and Networking",prereq:"EEX5563(CR), MHZ5375(CR)",sem:"5 & 6",type:"elective", credits: 3},
  {code:"EEI5280",title:"Creative Design",prereq:"Pass in 45 credits",sem:"5",type:"elective", credits: 2},
  {code:"EEI5466",title:"Advanced Database Systems",prereq:"EEI3266(P), AGM3263(CR)",sem:"5",type:"elective", credits: 3},
  {code:"DMM6602",title:"Management for Engineers",prereq:"CVM5401(CA), pass in 60 credits",sem:"7 & 8",type:"compulsory", credits: 3},
  {code:"EEI6360",title:"Software Project Management",prereq:"Pass in 60 credits",sem:"7",type:"compulsory", credits: 3},
  {code:"EEI6171",title:"Emerging Technologies",prereq:"Pass in 60 credits",sem:"7",type:"compulsory", credits: 2},
  {code:"EEI6567",title:"Software Architecture and Design",prereq:"EEX3467(P), EEI4362(P)",sem:"7 & 8",type:"compulsory", credits: 4},
  {code:"EEM6202",title:"Professional Practice",prereq:"Pass in 30 credits in level 3, Pass in 24 credits at level 4 or above",sem:"8",type:"compulsory", credits: 2},
  {code:"EEX6363",title:"Compiler Construction",prereq:"EEX4465(P), MHZ5375(P), pass in 60 credits",sem:"7 & 8",type:"compulsory", credits: 3},
  {code:"EEY6689",title:"Final Project – Software Engineering",prereq:"EEY6189(CA), EEI6360(CR), EEI6567(CR), Pass in 75 credits",sem:"7 & 8",type:"compulsory", credits: 8},
  {code:"EEX6340",title:"AI Techniques and Agent Technology",prereq:"EEX4465(P), EEX3467(P), MHZ5375(P)",sem:"8",type:"elective", credits: 3},
  {code:"EEX6278",title:"Neural Networks and Fuzzy Logic Applications",prereq:"EEX3467(P), Pass in 65 credits",sem:"7",type:"elective", credits: 3}
];

const input = document.getElementById('courseCode');
const suggestionsBox = document.getElementById('suggestions');

input.addEventListener('input', () => {
  const query = input.value.trim().toLowerCase();
  suggestionsBox.innerHTML = '';
  
  if (query.length > 0) {
    const matches = courses.filter(course => 
      course.code.toLowerCase().includes(query) || 
      course.title.toLowerCase().includes(query)
    );

    if (matches.length > 0) {
      suggestionsBox.style.display = 'block';
      matches.forEach(course => {
        const div = document.createElement('div');
        div.className = 'suggestion-item';
        div.innerHTML = `
          <span class="s-code">${course.code}</span>
          <span class="s-title">${course.title}</span>
        `;
        div.addEventListener('click', () => {
          input.value = course.code;
          suggestionsBox.style.display = 'none';
        });
        suggestionsBox.appendChild(div);
      });
    } else {
      suggestionsBox.style.display = 'none';
    }
  } else {
    suggestionsBox.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  if (e.target !== input && e.target !== suggestionsBox) {
    suggestionsBox.style.display = 'none';
  }
});

document.getElementById('goBtn').addEventListener('click', () => {
  const code = document.getElementById('courseCode').value.trim().toUpperCase();
  const year = document.getElementById('year').value.trim();

  if (code && year) {
    chrome.storage.local.set({ 
        "targetCode": code, 
        "targetYear": year,
        "isAutomationActive": true,
        "retryCount": 0
    }, () => {
      chrome.tabs.create({ url: "https://oulms.ou.ac.lk/login/index.php" });
    });
  }
});