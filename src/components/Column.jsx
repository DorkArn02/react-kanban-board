import React from 'react'
import { Box, VStack, Heading, Button, Text, Flex, useDisclosure } from '@chakra-ui/react';
import { Droppable } from 'react-beautiful-dnd';
import Item from './Item';
import { FaPlus } from 'react-icons/fa';
import ModalK from './ModalK';

const Column = ({ colId, col, addItem, removeItem }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <ModalK addItem={addItem} boardTitle={colId} isOpen={isOpen} onClose={onClose} />
            <VStack w={"100%"}>
                <Box>
                    <Flex p="1" justify={"space-between"} align="center">
                        <Box>
                            <Heading fontWeight={"medium"} size="lg">{colId}</Heading>
                        </Box>
                        <Box>
                            <Text fontWeight={"bold"} color="lightgray">{col.items.length}</Text>
                        </Box>
                    </Flex>
                    <Droppable droppableId={colId}>
                        {(provided, snapshot) => (
                            <VStack gap="5px" borderTop={`3px solid ${col.color}`} shadow="xl" style={{
                                background: snapshot.isDraggingOver
                                    ? "gray"
                                    : "",
                                padding: 4,
                                maxWidth: 250,
                                minHeight: 500
                            }}  {...provided.droppableProps} ref={provided.innerRef}>
                                {col.items.map(({ id, content, tags }, index) => {
                                    return (
                                        <Item colId={colId} removeItem={removeItem} color={col.color} tags={tags} key={id} index={index} content={content} draggableId={id} />
                                    );
                                })}
                                {provided.placeholder}
                            </VStack>
                        )}
                    </Droppable>
                    <Box w="100%">
                        <Button onClick={onOpen} leftIcon={<FaPlus />} w="100%" variant={"outline"}>Add another card</Button>
                    </Box>
                </Box>
            </VStack >
        </>
    )
}

export default Column