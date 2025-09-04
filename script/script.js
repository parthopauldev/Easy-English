// speak word feature 
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

// load lesson btn
let loadLessons = async () => {

  
  let jsonData = await fetch(
    "https://openapi.programming-hero.com/api/levels/all"
   
  );
  let data = await jsonData.json();
  displayData(data.data);
 
};

// load worddetails
let loadWordDetail = async (id) => {


  
    
    
  let jsonData = await fetch(
    `https://openapi.programming-hero.com/api/word/${id}`
  );

  let data = await jsonData.json();
console.log(data);

  displayWordDetail(data.data);
};
// id: 5;
// level: 1;
// meaning: "আগ্রহী";
// partsOfSpeech: "adjective";
// points: 1;
// pronunciation: "ইগার";
// sentence: "The kids were eager to open their gifts.";
// synonyms: (3)[("enthusiastic", "excited", "keen")];
// word: "Eager";
//  displayWordDetail
const displayWordDetail = (details) => {
  

  let detailBox = document.getElementById("details-box");
  detailBox.innerHTML = ` <div id="">
<h2 class="text-[36px] font-semibold leading-'[40px]
mb-[28px]">${details.meaning} ( <i class="fa-solid fa-microphone"></i> :${details.pronunciation})</h2>
<p class="text-[24px] font-semibold leading-[24px] mb-[5px]">Meaning</p>
<p class="text-[24px] font-medium leading-[40px] mb-[28px]">${details.meaning}</p>
<h3 class="font-semibold text-[24px] leading-[40px] mb-[5px]">Example</h3>
<p class="text-[24px] leading-[40px] mb-[28px]">${details.sentence}</p>
<h4 class="text-[24px] font-medium leading-[40px] mb-[5px]">সমার্থক শব্দ গুলো</h4>
<div class="flex gap-[15px] ">
   <button  class="btn bg-[#1A91FF1A] hover:bg-[#1A91FFFF]">${details.synonyms[0]}</button>
   <button  class="btn bg-[#1A91FF1A] hover:bg-[#1A91FFFF]">${details.synonyms[1]}</button>
   <button  class="btn bg-[#1A91FF1A] hover:bg-[#1A91FFFF]">${details.synonyms[2]}</button>
   

</div>
    </div>`;
  document.getElementById("my_modal_5").showModal();
 
};
// load level word
let loadLevelWord = async (id) => {
    loader(true)
  let jsonData = await fetch(
    `https://openapi.programming-hero.com/api/level/${id}`
  );

  let data = await jsonData.json();
  displayLevelData(data.data);
  removeActive();
  let lessonBtn = document.getElementById(`lesson-btn-${id}`);

  lessonBtn.classList.add("active");
};
// remove active class
let removeActive = () => {
  let allLessonBtn = document.querySelectorAll(".lesson-btn");

  allLessonBtn.forEach((btn) => {
    btn.classList.remove("active");
  });
};

// show level data
const displayLevelData = (levelWord) => {
  loader(false)
  let wordContainerDiv = document.getElementById("level-word-container");
  wordContainerDiv.innerHTML = "";
  if (levelWord.length === 0) {
    wordContainerDiv.innerHTML = `
    
    <div class="text-center col-span-full  rounded-xl py-10 space-y-6 font-bangla">
    <img class='mx-auto' src="./assets/alert-error.png" alt="">
    <p class="text-xl text-gray-400 font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
 <h3 class="font-bold text-4xl">নেক্সট Lesson এ যান</h3>
</div>`;
  }

  levelWord.forEach((item) => {
    let word = document.createElement("div");
word.classList.add('max-w-[600px]')
    word.innerHTML = `
<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
    <h2 class="font-bold text-2xl">${
      item.word ? item.word : "The word has not found"
    }</h2>
    <p class="font-semibold ">meaning / pronunciation</p>
    <div class="text-2xl font-serif font-bangla">${
      item.meaning ? item.meaning : "meaning has not found"
    } / ${
      item.pronunciation ? item.pronunciation : "pronunciation has not found"
    }</div>
    <div class="flex justify-between items-center">

       
        <button  onclick="loadWordDetail(${
          item.id
        })" class="btn bg-[#1A91FF1A] hover:bg-[#1A91FFFF]"><i class="fa-solid fa-circle-info"></i></button>
        <button onclick="pronounceWord('${item.word}')" class="btn bg-[#1A91FF1A] hover:bg-[#1A91FFFF]"><i class="fa-solid fa-volume-low"></i></button>
    </div>
</div>
`;
    wordContainerDiv.appendChild(word);
  });
   
};
// show lesson btn
const displayData = (allData) => {
  let lessonDiv = document.getElementById("lessons-container");
  lessonDiv.innerHTML = " ";
  for (const lesson of allData) {
    let levelDiv = document.createElement("div");
    levelDiv.innerHTML = `
     <button id='lesson-btn-${lesson.level_no}' onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline  primary-hover-color btn-primary">Lesson ${lesson.level_no}</button>
     `;
    lessonDiv.appendChild(levelDiv);
  }
};
// loader feature 
let loader = status=> {
    console.log('partho');
    
    if (status) {
        
        document.getElementById('loader').classList.remove('hidden')
        document.getElementById('level-word-container').classList.add('hidden')
    }else{
        document.getElementById('loader').classList.add('hidden')
        document.getElementById('level-word-container').classList.remove('hidden')

    }
}
loadLessons();
document.getElementById('search-btn').addEventListener('click',()=>{
let searchWord=document.getElementById('search-text').value;


let searchWordlower=searchWord.trim().toLowerCase();


searchWordLoad(searchWordlower)
})
let searchWordLoad=async searchWordlower=>{
let data=await fetch('https://openapi.programming-hero.com/api/words/all')
let allData=await data.json();
let allWord=  allData.data;
console.log(allWord);

let findWord=allWord.filter(word=>word.word.toLowerCase().includes(searchWordlower))
displayLevelData(findWord)




};
