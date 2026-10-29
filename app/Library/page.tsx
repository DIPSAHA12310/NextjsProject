import Link from 'next/link';
import { library } from '../Library';
import LIbraryCardSystem from './LIbraryCard';


const Library = async()=>{
const res = await fetch ("http://localhost:3000/libraryData.json")
const data = await res.json();
return data
}


const LibraryCard = async() => {
    const LibraryData = await Library()
    return (
        <div>
           <div className='text-4xl pt-10 font-bold'>
                THE LIBRARY 
              
            </div>
              <span>
                    Twelve lifts covering every major muscle grupe.
                </span>
         

            <div className='grid grid-cols-3 gap-2'>
                 {LibraryData.map((card:library)=> <Link href={`/Library/${card.id}`} key={card.id}><LIbraryCardSystem  card={card}></LIbraryCardSystem></Link> )}
            </div>
       
        </div>
    );
};

export default LibraryCard;