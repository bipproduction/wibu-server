'use client'
import { useMemo, useState } from 'react'
import _ from 'lodash'
import { DragDropContext, Draggable, Droppable, OnDragEndResponder } from '@hello-pangea/dnd'
import { Box, Card, Flex, Group, Stack, Title } from '@mantine/core';


export default function Page() {

    const initial = [
        {
            id: '1',
            content: '1',
            chiildren: [
                {
                    id: '1.1',
                    content: '1.1'
                }
            ]
        },
        {
            id: '2',
            content: '2',
            chiildren: [
                {
                    id: '2.1',
                    content: '2.1'
                }
            ]
        }
    ]

    const onDragEnd = (result: any) => {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const res: any = Array.from(state.quotes);
        const [removed] = res.splice(result.source.index, 1);
        res.splice(result.destination.index, 0, removed);

        setState({ quotes: res });
    }

    const [state, setState] = useState({ quotes: initial });

    return <Group>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="list" direction='horizontal'>
                {provided => (
                    <Flex bg={"cyan"} ref={provided.innerRef} {...provided.droppableProps} gap={10}>
                        {state.quotes.map((quote, index: number) => (
                            <Stack key={quote.id} >
                                <Draggable draggableId={quote.id} index={index}>
                                    {provided => (
                                        <Card bg={"grape"}
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                        >
                                            {quote.content}
                                        </Card>
                                    )}
                                </Draggable>
                            </Stack>
                        ))}
                        <div>
                            {provided.placeholder}
                        </div>
                    </Flex>
                )}
            </Droppable>
        </DragDropContext>
    </Group>
}
