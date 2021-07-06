import React, { useEffect, useRef, useState} from 'react';
import PropTypes from 'prop-types';
import * as dropEffects from "./dropEffects";

const draggingStyle = {
    opacity: .25,
};

const Draggable = props => {
    const [isDragging, setIsDragging] = useState(false);
    const image = useRef(null);

    useEffect(() => {
        image.current = null;
        if (props.dragImage) {
            image.current = new Image();
            image.current.src = props.dragImage;
        }
    }, [props.dragImage]);

    const startDrag = e => {
        setIsDragging(true);
        e.dataTransfer.setData("drag-item", props.dataItem);
        e.dataTransfer.effectAllowed = props.dropEffect;
        if (image.current){
            e.dataTransfer.setDragImage(image.current, 0, 0);
        }
    }

    const dragEnd = () => {
        setIsDragging(false);
    }

    return (
        <div style={isDragging ? draggingStyle : {}} draggable onDragStart={startDrag} onDragEnd={dragEnd}>
            {props.children}
        </div>
    );
};

Draggable.propTypes = {
    dataItem: PropTypes.string.isRequired,
    dragImage: PropTypes.string,
    dropEffect: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

Draggable.defaultProps = {
    dragImage: null,
    dropEffect: dropEffects.All
};

export default Draggable;
