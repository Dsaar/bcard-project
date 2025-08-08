import React, { memo } from 'react'


function ChildrenOfCounter({sentence}) {

	
console.log('component is rendered again');


	return (
		<div>
			Hello From Children Of Counter Component!!
			{sentence}
		</div>
	)
}

export default memo(ChildrenOfCounter) 