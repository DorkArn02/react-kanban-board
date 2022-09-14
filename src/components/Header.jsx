import React from 'react'
import { Box, Flex, Heading } from '@chakra-ui/react'

const Header = () => {
    return (
        <Box p={2} mb={4} bgColor='gray.700'>
            <Heading size="lg" textAlign={"center"} mb={5}>React kanban board</Heading>
        </Box>
    )
}

export default Header