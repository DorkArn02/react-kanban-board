import { Box, Flex, HStack, IconButton, Spacer, Tag, Text } from '@chakra-ui/react'
import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { FaMinus } from 'react-icons/fa'

const Item = ({ draggableId, removeItem, index, content, color, tags, colId }) => {
    return (
        <Draggable draggableId={draggableId} index={index}>
            {(provided) => (
                <Box p={1} w="100%" borderLeft={`3px solid ${color}`} minHeight="100px" height={"auto"} shadow="lg" ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                    <HStack mb={2}>
                        <Text w="80%">{content[0].toUpperCase() + content.slice(1).toLowerCase()}</Text>
                        <Spacer />
                        <IconButton onClick={() => removeItem(colId, draggableId)} size="xs" borderRadius={"20px"} icon={<FaMinus />}></IconButton>
                    </HStack>

                    <Flex flexWrap={"wrap"} gap="10px">
                        {tags && tags.map((tag, index) => {
                            return <Tag key={index} variant={"solid"} fontSize="10px" colorScheme={"facebook"}>{tag}</Tag>
                        })}
                    </Flex>
                </Box>
            )}
        </Draggable >
    )
}

export default Item