import React, {useEffect, useState} from 'react'
import { app } from '../firebase/firebase.config';
import { getDatabase, ref, get } from 'firebase/database';

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const DisplayFruits = () => {

  const [fruitsArray, setFruitsArray] = useState([]); 

  const getFruitsArray = async () => {
    const db = getDatabase(app); 
    const folderRef = ref(db, 'nature/fruits'); 
    try{
      const snapshot = await get(folderRef); 
      if(snapshot?.exists()){
        setFruitsArray(Object.values(snapshot.val())); 
      }
    }
    catch(err){
      toast.error(err?.message); 
      console.log(err); 
    }
  }

  useEffect( () => {
    getFruitsArray(); 
  }, []) 

  const tableHeaderRowColCSS = 'text-center flex items-center justify-center border-l-[2px] border-black'; 
  const rowColsCSS = 'text-center flex items-center justify-center'; 

  const iconsCSS = 'hover:cursor-pointer text-xl h-[24px] w-[24px] rounded-full flex justify-center items-center '; 

  return (
    <div className='w-[450px] h-[480px] rounded-lg overflow-hidden border-[1px] border-white text-white'>
      <table className='h-full w-full flex flex-col'> 
        <tr className='grid-flexible-cols bg-white text-black h-[80px] w-full flex'> 
          <th className='text-center flex items-center justify-center'> Fruit Name </th>
          <th className={tableHeaderRowColCSS}> Fruit Colour </th>
          <th className={tableHeaderRowColCSS}> Options </th>
        </tr>
        <div className='h-[400px] w-full overflow-y-auto scrollbar'> 
          {
            fruitsArray?.map( (fruitObj, index) => {
              return(
                <tr key={fruitObj?._id} className={`grid-flexible-cols h-[80px] w-full border-t-[1px] ${ (index > 0 ? 'border-white' : 'border-transparent')}`} >
                  <td className={rowColsCSS}> {fruitObj?.fruitName} </td>
                  <td className={rowColsCSS}> {fruitObj?.fruitColour} </td>
                  <td className='text-center flex items-center justify-center gap-4'> 
                    <span className={iconsCSS + 'hover:text-sky-500'}>
                      <MdEdit />
                    </span>
                    <span className={iconsCSS + 'hover:text-red-500'}>
                      <MdDelete />
                    </span>
                  </td>
                </tr>
              )  
            })
          }
        </div>
      </table>
    </div>
  )
}

export default DisplayFruits