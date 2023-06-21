import React from "react";
import './Column.scss';
import Card from "components/Card/Card";
import { mapOrder } from "utilities/sorts";
import { Container, Draggable } from "react-smooth-dnd";


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
                {column.title}
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
                Add an other card
            </footer>
        </div>
    )
}

export default Column;