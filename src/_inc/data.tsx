import {_shuffleArray }from './_inc_functions'

import { projectFirestore } from "../firebase/config";
import { collection, getDocs } from 'firebase/firestore';
import { My_Type_Img_Name, My_Type_Image, My_Type_ImgCount } from './my_types';

  const uuid = require('uuid')
// import { v4 } from 'uuid';

// type Image = { id: string; name: string };


export async function fetchImageNames(){
  let arrImg: My_Type_Image[] = []; // create empty array -> it will be filled with img´s names 

  try {
    // loading docs from Firebase
    const snapshot = await getDocs(collection(projectFirestore, "pexeso-img-names"));
    snapshot.forEach((doc) => {
      const name: My_Type_Img_Name = doc.data().name;
      const id: string = doc.id;           //get id of document 

      if (name) {
        arrImg.push({ id, name }); // add name to array 
      }
    });
  } catch (error) {
    console.error("Chyba pri načítaní dát z Firestore:", error);
    return []; // if error return empty array 
  }

  return arrImg

}

// const arrImg= ["lightning", "drop", "sea", "space", "sun", "vibration", "wind", "wood"];
export async function fetchImageDivs() {
  let fetchedImageNamesAndId: My_Type_Image[] = []; // create empty array -> it will be filled with img´s names

  fetchedImageNamesAndId= await fetchImageNames()

  let arrImg: My_Type_Img_Name[] = fetchedImageNamesAndId.map(imgNameAndId => imgNameAndId.name) // return only name of picture


  const doubleImgs: My_Type_Img_Name[] = [...arrImg, ...arrImg];

  //to shuffle before every game
  _shuffleArray(doubleImgs);

  //creation of 2-dimensional array: - out of component to make id´s stable
// ['123e4567-e89b-12d3-a456-426614174000', 'lightning'],
// ['123e4567-e89b-12d3-a456-426614174001', 'drop'],..
  const imgsWithKeys = doubleImgs.map(pictureName => [uuid.v4(), pictureName]);

//array of img names -> div>img
let divItems = imgsWithKeys.map(([id, pictureName]) => ({
    id: id,
    // imgPath: pictureName,
    name: pictureName,
    classNames: ["mask"],
  }));

  return divItems; // return final array 
}

export async function fetchImageDivsForCounts(selectedCountOfImg: My_Type_ImgCount ) {
  let fetchedImageNamesAndId: My_Type_Image[] = []; // create empty array -> it will be filled with img´s names

  fetchedImageNamesAndId= await fetchImageNames()

  let arrImg = fetchedImageNamesAndId.map(imgNameAndId => imgNameAndId.name) // return only name of picture

  // //to shuffle before every game
  // _shuffleArray(arrImg);
  
   let afterCutArrImg = arrImg.slice(0, selectedCountOfImg)

   const doubleImgs = [...afterCutArrImg, ...afterCutArrImg];

   //to shuffle before every game
  _shuffleArray(doubleImgs);

  //creation of 2-dimensional array: - out of component to make id´s stable
// ['123e4567-e89b-12d3-a456-426614174000', 'lightning'],
// ['123e4567-e89b-12d3-a456-426614174001', 'drop'],..
  const imgsWithKeys = doubleImgs.map(pictureName => [uuid.v4(), pictureName]);

//array of img names -> div>img
let divItems = imgsWithKeys.map(([id, pictureName]) => ({
    id: id,
    // imgPath: pictureName,
    name: pictureName,
    classNames: ["mask"],
  }));

  return divItems; // return final array 
}

export function preloadImages(imgIdAndNamesArr: My_Type_Image[]) { //-------------------------function during loading images 
  return Promise.all(
    imgIdAndNamesArr.map((picture) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = "../pictures/pexeso/"+picture.name+".jpg";
        img.onload = () => resolve(picture.name);
        img.onerror = () => reject(new Error(`Chyba načítania: ${picture.name}`));
      });
    })
  );
}