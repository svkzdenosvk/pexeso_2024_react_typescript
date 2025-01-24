import {_shuffleArray }from './_inc_functions'

import { projectFirestore } from "../firebase/config";
import { collection, getDocs } from 'firebase/firestore';
import { My_Type_Img_Name, My_Type_ImgCount } from './my_types';

  const uuid = require('uuid')

  export async function fetchOnlyImgNames(){
    let arrImg: My_Type_Img_Name[] = []; //---------------------------------- create empty array -> it will be filled with img´s names 
  
    try { // --------------------------------------------------------------loading docs from Firebase
      
      const snapshot = await getDocs(collection(projectFirestore, "pexeso-img-names"));
      snapshot.forEach((doc) => {
        const name: My_Type_Img_Name = doc.data().name;
  
        if (name) {
          arrImg.push(name); //------------------------------------add name to array 
        }
      });
    } catch (error) {
      console.error("Chyba pri načítaní dát z Firestore:", error);
      return []; // -------------------------------------------------------if error return empty array 
    }
  
    return arrImg
  
  }

// export async function fetchImageNames(){
//   let arrImg: My_Type_Image[] = []; //---------------------------------- create empty array -> it will be filled with img´s names 

//   try { // --------------------------------------------------------------loading docs from Firebase
    
//     const snapshot = await getDocs(collection(projectFirestore, "pexeso-img-names"));
//     snapshot.forEach((doc) => {
//       const name: My_Type_Img_Name = doc.data().name;
//       const id: string = doc.id; //--------------------------------------get id of document 

//       if (name) {
//         arrImg.push({ id, name }); //------------------------------------add name to array 
//       }
//     });
//   } catch (error) {
//     console.error("Chyba pri načítaní dát z Firestore:", error);
//     return []; // -------------------------------------------------------if error return empty array 
//   }

//   return arrImg

// }

// export async function fetchImageDivs() {
//   let fetchedImageNamesAndId: My_Type_Image[] = []; //-------------------create empty array -> it will be filled with img´s names

//   fetchedImageNamesAndId= await fetchImageNames()

//   let arrImg: My_Type_Img_Name[] = fetchedImageNamesAndId.map(imgNameAndId => imgNameAndId.name) // return only name of picture


//   const doubleImgs: My_Type_Img_Name[] = [...arrImg, ...arrImg];

//   _shuffleArray(doubleImgs);//-------------------------------------------to shuffle before every game

//   //creation of 2-dimensional array: - out of component to make id´s stable
// // ['123e4567-e89b-12d3-a456-426614174000', 'blesk'],
// // ['123e4567-e89b-12d3-a456-426614174001', 'kvapka'],..
//   const imgsWithKeys = doubleImgs.map(pictureName => [uuid.v4(), pictureName]);

// let divItems = imgsWithKeys.map(([id, pictureName]) => ({ //--------------array of img names -> div>img
//     id: id,
//     name: pictureName,
//     classNames: ["mask"],
//   }));

//   return divItems; // ----------------------------------------------------return final array 
// }

export async function fetchImageDivsForCounts(selectedCountOfImg: My_Type_ImgCount, imgNames: My_Type_Img_Name[] ) {
  // let fetchedImageNamesAndId: My_Type_Image[] = []; // -------------------create empty array -> it will be filled with img´s names

  // fetchedImageNamesAndId= await fetchImageNames()

  // let arrImg = fetchedImageNamesAndId.map(imgNameAndId => imgNameAndId.name) // return only name of picture

  _shuffleArray(imgNames);//-------------------------------------------------shuffle to randomize order of all received picture 
  
   let afterCutArrImg = imgNames.slice(0, selectedCountOfImg)//--------------to cut selected count of pictures 

   const doubleImgs = [...afterCutArrImg, ...afterCutArrImg];

   
  _shuffleArray(doubleImgs);//----------------------------------------------to shuffle before every game

  //creation of 2-dimensional array: - out of component to make id´s stable
// ['123e4567-e89b-12d3-a456-426614174000', 'blesk'],
// ['123e4567-e89b-12d3-a456-426614174001', 'kvapka'],..
  const imgsWithKeys = doubleImgs.map(pictureName => [uuid.v4(), pictureName]);

let divItems = imgsWithKeys.map(([id, pictureName]) => ({//-----------------array of img names -> div>img
    id: id,
    name: pictureName,
    classNames: ["mask"],
  }));

  return divItems; // ------------------------------------------------------return final array 
}

export function preloadImages(imgNamesArr: My_Type_Img_Name[]) { //-------function during loading images 
  return Promise.all(
    imgNamesArr.map((picture) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = "../pictures/pexeso/"+picture+".jpg";
        img.onload = () => resolve(picture);
        img.onerror = () => reject(new Error(`Chyba načítania: ${picture}`));
      });
    })
  );
}