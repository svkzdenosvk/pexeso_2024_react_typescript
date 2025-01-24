// ---------------------------
 // ---------------------------file with included functions to make cleaner and more readable code
 // ---------------------------


  // ---------------------------functions of styles

 export function _stylingAfterStart(){/*-----------------------------f. for style changes after click on "start" button ..inc to TimeAndStart.js*/
       //to hide start button 
       document.getElementById("start")?.setAttribute('style', 'display: none'); 
       document.getElementsByTagName("H3")[0].setAttribute('style', 'display: none'); 
        
       //styling all react app id result
       document.getElementById("result")?.setAttribute('style', 'justify-content: start; flex-direction: column');

       // to see images
       document.getElementsByClassName("column_content")[0].setAttribute('style', 'display: flex');
 }


// ---------------------------function for shuffle

 export function _shuffleArray(array: any[]) {/*-------------------------------------------------partial f. to shuffle random positions in array stolen from : https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array  (EDIT: Updating to ES6 / ECMAScript 2015) */
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}  


// ---------------------------function for time formating
export function _fmtMSS(s:number){return(s-(s%=60))/60+(9<s?':':':0')+s}/*---------------------formate seconds -> time */


// ---------------------------function for toggle of classes

export function _myToggle(elm: HTMLElement ,removedClass: string, addedClass: string){
  elm.classList.add(addedClass);
  elm.classList.remove(removedClass);
}

//----------------------------function for typescript
export function my_Type_Guard_function< My_Type extends string >(
  value: string,
  arr: readonly My_Type[]
): value is My_Type {
  return arr.includes(value as My_Type);
}