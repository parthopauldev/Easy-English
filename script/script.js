
// load lesson btn 
let loadLessons= async () => {
    let jsonData=await fetch('https://openapi.programming-hero.com/api/levels/all')
    let data=await jsonData.json();
displayData(data.data)

}
// load worddetails
let loadWordDetail=async (id) => {
    let jsonData=await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
    console.log(id);
    
    let data=await jsonData.json();
displayWordDetail(data.data)

console.log(jsonData+'gfr');

 } ;
//  displayWordDetail
const displayWordDetail = details => {
console.log(details);


}
// load level word 
let loadLevelWord= async (id) => {
    let jsonData=await fetch(`https://openapi.programming-hero.com/api/level/${id}`)
   
    let data=await jsonData.json();
    displayLevelData(data.data)
    removeActive();
    let lessonBtn=document.getElementById(`lesson-btn-${id}`);
   
    
    lessonBtn.classList.add('active')
}
// remove active class 
 let removeActive=() => {
    
    let allLessonBtn=document.querySelectorAll('.lesson-btn');
   
    
    allLessonBtn.forEach(btn => {
    btn.classList.remove('active');
    
});
    

}

// show level data
const displayLevelData = levelWord => {

let wordContainerDiv=document.getElementById('level-word-container')
wordContainerDiv.innerHTML='';
if (levelWord.length === 0) {
    wordContainerDiv.innerHTML=`
    
    <div class="text-center col-span-full  rounded-xl py-10 space-y-6 font-bangla">
    <img class='mx-auto' src="./assets/alert-error.png" alt="">
    <p class="text-xl text-gray-400 font-medium">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
 <h3 class="font-bold text-4xl">নেক্সট Lesson এ যান</h3>
</div>`;
  
}

levelWord.forEach(item => {
   
    
let word=document.createElement('div');

word.innerHTML=`
<div class="bg-white rounded-xl shadow-sm text-center py-10 px-5 space-y-4">
    <h2 class="font-bold text-2xl">${item.word?item.word:'The word has not found'}</h2>
    <p class="font-semibold ">meaning / pronunciation</p>
    <div class="text-2xl font-serif font-bangla">${item.meaning?item.meaning:'meaning has not found'} / ${item.pronunciation?item.pronunciation:'pronunciation has not found'}</div>
    <div class="flex justify-between items-center">

       
        <button  onclick="loadWordDetail(${item.id})" class="btn bg-[#1A91FF1A] hover:bg-[#1A91FFFF]"><i class="fa-solid fa-circle-info"></i></button>
        <button class="btn bg-[#1A91FF1A] hover:bg-[#1A91FFFF]"><i class="fa-solid fa-volume-low"></i></button>
    </div>
</div>
`
wordContainerDiv.appendChild(word)

});


}
// show lesson btn 
const displayData = allData => {
    let lessonDiv=document.getElementById('lessons-container');
    lessonDiv.innerHTML=' '
    for (const lesson of allData) {
        
        
      
        
    let levelDiv= document.createElement('div');
    levelDiv.innerHTML=`
     <button id='lesson-btn-${lesson.level_no}' onclick="loadLevelWord(${lesson.level_no})" class="lesson-btn btn btn-outline  primary-hover-color btn-primary">Lesson ${lesson.level_no}</button>
     `
    lessonDiv.appendChild(levelDiv);
};

}


loadLessons()