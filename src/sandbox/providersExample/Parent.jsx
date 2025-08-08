import React from "react";
import Child from "./Child";

function Parent() {


	const message = 'Hello From Parent Component';


	return (
		<div>
			<h2>Parent Component</h2>
			<Child message={message}/>
		</div>
	)

}

export default Parent