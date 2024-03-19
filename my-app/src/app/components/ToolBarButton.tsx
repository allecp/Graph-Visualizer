import React from 'react'



const ToolBarButton = ({func,text} : {func:() => void,text: string}) => {
  return (
    <button className = "mr-2" onClick = {func} >{text}</button>
  )
}

export default ToolBarButton