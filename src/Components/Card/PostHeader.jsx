import userImage from '../../assets/icon-7797704_1280.png'

export default function PostHeader({photo , name , date}) {
  return <>
  
  <div className="flex">
          <img onError={(e)=> e.target.src = userImage} className=" rounded-full w-10 h-10 mr-3" src={photo} alt={name} />
        <div>    
          <h3 className="text-md font-semibold ">{name}</h3>
          <p className="text-xs text-gray-500">{new Date(date).toLocaleString('en-UK' ,{
            year:'numeric',
            month:'2-digit',
            day:'2-digit',
            hour:'2-digit',
            minute:'2-digit'
          })}</p>
        </div>
      </div>
  
  
  </>
}
