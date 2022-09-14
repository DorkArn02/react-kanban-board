import React from 'react'
import { v4 as uuid } from "uuid"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Tag,
    TagLabel,
    TagCloseButton
} from '@chakra-ui/react'
import { useState } from 'react'

const ModalK = ({ isOpen, onClose, boardTitle, addItem }) => {
    const [title, setTitle] = useState("")
    const [tags, setTags] = useState([])

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            e.preventDefault()

            if (e.target.value === '')
                return;
            setTags([...tags, e.target.value])
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        addItem(boardTitle, { id: uuid(), content: title, tags: tags })
        onClose()
        setTitle("")
        setTags([])
    }

    const removeFromTags = (name) => {

        const filtered = tags.filter(i => i !== name)
        setTags(filtered)
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add issue to {boardTitle}</ModalHeader>
                <ModalCloseButton />
                <form onSubmit={onSubmit}>
                    <ModalBody>
                        <FormControl isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input onChange={(e) => setTitle(e.target.value)} placeholder='Title' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Tags</FormLabel>
                            {tags.map((tag, index) => {
                                return <Tag key={index} mr={2}>
                                    <TagLabel>{tag}</TagLabel>
                                    <TagCloseButton onClick={() => removeFromTags(tag)} />
                                </Tag>
                            })}
                            <Input onKeyDown={handleEnter} placeholder='Press enter to add a new tag' />
                        </FormControl>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        <Button variant='outline' type={"submit"}>Add</Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    )
}
export default ModalK