import React from 'react'
import { useSpecialMessage } from '../providers/SpecialMessageProvider'

function GrandChild({message}) {
	const specialMessage = useSpecialMessage()
  return (
	<div>
		<h4>GrandChild Component</h4>
		<p>Parent:{message}</p>
		  <p>The data from the context is: {specialMessage}</p>
	</div>
  )
}

export default GrandChild