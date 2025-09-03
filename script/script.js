let loadLessons= async () => {
    let jsonData=await fetch('https://openapi.programming-hero.com/api/levels/all')
    let data=await jsonData.json();
displayData(data.data)

}
loadLessons()
const displayData = allData => {
   let lessonDiv=document.getElementById('lessons-container');
   lessonDiv.innerHTML=' '
   for (const lesson of allData) {
    
   
    console.log(lesson);
    
    let levelDiv= document.createElement('div');
    levelDiv.innerHTML=`
      <button class="btn btn-outline btn-primary border-color  primary-hover-color text-color">Lesson ${lesson.level_no}</button>
    `
    lessonDiv.appendChild(levelDiv);
   };
    
}

