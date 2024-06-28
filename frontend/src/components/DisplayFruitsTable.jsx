import React, {useEffect, useState} from 'react'
import { app } from '../firebase/firebase.config';
import { getDatabase, ref, get } from 'firebase/database';

import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";


const DisplayFruitsTable = ({displayFruitsTableProps}) => {

  const {
    isUpdateDivActive,
    setIsUpdateDivActive, 
    setNewFruitName, 
    setNewFruitColour 
  } = displayFruitsTableProps; 

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


  const handleEditFruitDetails = (e, fruitObj) => {
    e.stopPropagation(); 
    if(isUpdateDivActive === false){
      setNewFruitName(fruitObj?.fruitName); 
      setNewFruitColour(fruitObj?.fruitColour); 
      setIsUpdateDivActive(true); 
    }
    else{
      setNewFruitName(fruitObj?.fruitName); 
      setNewFruitColour(fruitObj?.fruitColour); 
    }
  }

  const tableHeaderRowColCSS = 'text-center flex items-center justify-center border-l-[2px] border-black p-2'; 
  const rowColsCSS = 'text-center flex items-center justify-center overflow-x-auto p-2'; 

  const iconsCSS = 'hover:cursor-pointer text-xl h-[26px] w-[26px] rounded-full flex justify-center items-center '; 

  return (
    <div className='w-full h-full flex justify-center items-center xl:w-[500px] xl:h-[480px] mb-20 xl:mb-0'>
      <table className='w-[500px] h-[480px] rounded-lg overflow-hidden border-[1px] border-white text-white flex flex-col mx-8'> 
        <thead className='bg-white text-black h-[80px] w-full'> 
          <tr className='h-full w-full grid-flexible-cols flex'> 
            <th className='text-center flex items-center justify-center p-2'> Fruit Name </th>
            <th className={tableHeaderRowColCSS}> Fruit Colour </th>
            <th className={tableHeaderRowColCSS}> Options </th>
          </tr>
        </thead>
        <tbody className='h-[400px] w-full overflow-y-auto scrollbar'> 
          {
            fruitsArray?.map( (fruitObj, index) => {
              return(
                <tr key={fruitObj?._id} className={`grid-flexible-cols h-[80px] w-full border-t-[1px] ${ (index > 0 ? 'border-white' : 'border-transparent')}`} >
                  <td className={rowColsCSS}> {fruitObj?.fruitName} </td>
                  <td className={rowColsCSS}> {fruitObj?.fruitColour} </td>
                  <td className='text-center flex items-center justify-center gap-2'> 
                    <span onClick={ (e) => handleEditFruitDetails(e, fruitObj) } className={iconsCSS + 'hover:text-sky-500 icon'}>
                      <MdEdit />
                    </span>
                    <span className={iconsCSS + 'hover:text-red-500 icon'}>
                      <MdDelete />
                    </span>
                  </td>
                </tr>
              )  
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default DisplayFruitsTable