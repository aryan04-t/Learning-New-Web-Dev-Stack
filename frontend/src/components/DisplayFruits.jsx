import React, {useEffect, useState} from 'react'
import { app } from '../firebase/firebase.config';
import { getDatabase, ref, get } from 'firebase/database';


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

  const rowColsCSS = 'w-[50%] h-full text-center flex items-center justify-center'; 

  return (
    <div className='w-[400px] h-[480px] rounded-lg overflow-hidden border-[1px] border-white text-white'>
      <table className='h-full w-full flex flex-col'> 
        <tr className='bg-white text-black h-[80px] w-full flex border-b-[1px] border-white'> 
          <th className={rowColsCSS}> Fruit Name </th>
          <th className={rowColsCSS}> Fruit Colour </th>
        </tr>
        <div className='h-[400px] w-full overflow-y-auto scrollbar'> 
          {
            fruitsArray?.map( (fruitObj, index) => {
              return(
                <tr key={fruitObj?._id} className={`flex h-[80px] w-full border-t-[1px] ${ (index > 0 ? 'border-white' : 'border-transparent')}`} >
                  <td className={rowColsCSS}> {fruitObj?.fruitName} </td>
                  <td className={rowColsCSS}> {fruitObj?.fruitColour} </td>
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