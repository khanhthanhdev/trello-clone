import React, {useState, useEffect} from "react";
import './BoardContent.scss'
import Column from "components/Column/Column";
import 'App.scss'
import {isEmpty} from "lodash";
import {Container as BootstrapContainer, Row, Col, Form, Button} from 'react-bootstrap'
import { mapOrder } from "utilities/sorts";
import {applyDrag} from "utilities/dragDrop";
import { Container, Draggable } from "react-smooth-dnd";
import { initialData } from "actions/initialData";

function BoardContent() {

    const [board, setBoard] = useState({});

    const [columns, setColumns] = useState({})

    useEffect(() => {
        const boardFromDB = initialData.boards.find(board => board.id === 'board-1');
        if(boardFromDB) {
            setBoard(boardFromDB);
            setColumns(mapOrder(boardFromDB.columns, boardFromDB.columnOrder, 'id'));
        }
    }, [])

    if (isEmpty(board)) {
        return <div className="not-found" style={{ 'padding': '10px', 'color': 'white'}} >Board not found</div>
    }


    const onColumnDrop = (dropResult) => {
        let newColumns = [...columns];
        newColumns = applyDrag(newColumns, dropResult);

        let newBoard = {...board};
        newBoard.columnOrder = newColumns.map(c => c.id);
        newBoard.columns = newColumns;

        setColumns(newColumns);
        setBoard(newBoard);
    }

    const onCardDrop = (columnId, dropResult) => {
        if(dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
            let newColumns = [...columns];
            let currentColumn = newColumns.find(c => c.id === columnId);
            currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
            currentColumn.cardOrder = currentColumn.cards.map(i => i.id);

            setColumns(newColumns);           
        }
    }


    return (
        <div className="board-content">
            <Container
                orientation="horizontal"
                onDrop={onColumnDrop}
                getChildPayload={index => columns[index]}
                dragHandleSelector=".column-drag-handle"
                dropPlaceholder={{
                    animationDuration: 150,
                    showOnTop: true,
                    className: 'column-drop-preview'
                }}
            >
                {columns.map((column, index) => (
                    <Draggable key={index}>
                        <Column column={column} onCardDrop={onCardDrop}/>
                    </Draggable>
                    
                ))}
            </Container>
            <BootstrapContainer className="trello-container">
                <Row>
                    <Col className="add-new-column">
                        <i className="fa fa-plus icon"/> Add another column
                    </Col>
                </Row>

                <Row>
                    <Col className="enter-new-column">
                        <Form.Control 
                            size="sm"
                            type="text"
                            placeholder="Enter column title..."
                            className="input-enter-new-column"
                        />
                        <Button variant="success" size="sm">
                            Add column
                        </Button>
                        <span className="cancel-new-column">
                            <i className="fa fa-trash icon"/>
                        </span>
                    </Col>
                </Row>
            </BootstrapContainer>
        </div>
    )
}

export default BoardContent;