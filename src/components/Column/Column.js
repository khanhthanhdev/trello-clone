import React from "react";
import './Column.scss';
import Card from "components/Card/Card";
import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";
import { Dropdown } from "react-bootstrap";

import ComfirmModal from "components/Common/ConfirmModal";

function Column(props) {

    const { column, onCardDrop } = props;
    const cards = mapOrder(column.cards, column.cardOrder, 'id')

    // const onCardDrop = (columnId, dropResult) => {
    //     if(dropResult.removedIndex !== null || dropResult.addedIndex !== null) {

    //     }
    // }


    return (
        <div className="column">
            <header className="column-drag-handle">
                <div className="column-title">
                    {column.title}
                </div>
                <div className="column-dropdown-actions">
                    <Dropdown>
                        <Dropdown.Toggle  id="dropdown-basic" size="sm" className="dropdown-btn" />
                            
                        <Dropdown.Menu>
                            <Dropdown.Item >Add card ...</Dropdown.Item>
                            <Dropdown.Item >Remove Column </Dropdown.Item>
                            <Dropdown.Item >Move all cards in this column</Dropdown.Item>
                            <Dropdown.Item >Archive all cards in this column</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </header>
            <div className="card-list">
                <Container
                    
                    // onDragStart={e => console.log('drag started', e)}
                    // onDragEnd={e => console.log('drag end', e)}
                    groupName="col"
                    onDrop={dropResult => onCardDrop(column.id, dropResult)}
                    getChildPayload={index => cards[index]}
                    dragClass="card-ghost"
                    dropClass="card-ghost-drop"
                    dropPlaceholder={{
                        animationDuration: 150,
                        showOnTop: true,
                        className: 'card-drop-preview'
                    }}
                    dropPlaceholderAnimationDuration={200}
                >
                    {cards.map((card, index) => (
                        <Draggable key={index}>
                            <Card card={card} />
                        </Draggable>

                    ))}
                </Container>

            </div>
            <footer>
                <div className="footer-actions">
                    <i className="fa fa-plus icon"/>Add an other card
                </div>

            </footer>

            <ComfirmModal
                show={false}
                onAction={() => { }}
                title="Remove column"
                content={`Are you sure you want to remove ${column.title}`}
            />
        </div>
    )
}

export default Column;