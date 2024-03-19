import React from 'react'
import { useReactFlow } from 'reactflow'

type ChangeButtonProps = {
    changeHandler: () => void;
}

const ChangeButton = ({changeHandler} : ChangeButtonProps) => {
    const reactFlow = useReactFlow();

  return (
    <button className = "mr-2 text-white" onClick = {() => {
        changeHandler();
        setTimeout(() => reactFlow.fitView());
        }}>Change</button>
  )
}

export default ChangeButton