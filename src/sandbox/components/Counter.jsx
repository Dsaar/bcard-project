import React, { useState } from 'react'
import { Box, Button, Typography } from '@mui/material'
import ChildrenOfCounter from './ChildrenOfCounter';

function Counter() {
	const [count, setCount] = useState(0)

	const increment = () => {
		setCount((prev) => prev + 1);
	};

	const decrement = () => {
		setCount((prev) => prev - 1);
	};



	return <Box>
		<Button variant='contained' color='success' onClick={increment}>+</Button>
		<Button variant='contained' color='error' onClick={decrement}>-</Button>
		<Typography>{count}</Typography>
		<ChildrenOfCounter sentence={count > 10 ? ' the count is above ten' : ' the count is under ten'} ></ChildrenOfCounter>
	</Box>

}

export default Counter