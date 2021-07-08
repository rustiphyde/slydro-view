import React, { useState } from "react";
import PropTypes from "prop-types";
import * as dropEffects from "./dropEffects";

const insideStyle = {
	opacity: 0.5,
};

const Droppable = (props) => {
	const [isOver, setIsOver] = useState(false);

	const dragOver = (e) => {
		e.preventDefault();
		e.dataTransfer.dropEffect = props.dropEffect;
	};

	const drop = (ev) => {
		const droppedItem = ev.dataTransfer.getData("drag-item");
		if (droppedItem) {
			props.onItemDropped(droppedItem);
		}
		setIsOver(false);
	};

	const dragEnter = (ev) => {
		ev.dataTransfer.dropEffect = props.dropEffect;
		setIsOver(true);
	};

	const dragLeave = () => setIsOver(false);

	return (
		<div
			onDragOver={dragOver}
			onDrop={drop}
			onDragEnter={dragEnter}
			onDragLeave={dragLeave}
			style={{ width: "100%", height: "100%", ...(isOver ? insideStyle : {}) }}
		>
			{props.children}
		</div>
	);
};

Droppable.propTypes = {
	onItemDropped: PropTypes.func.isRequired,
	dropEffect: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]).isRequired,
};

Droppable.defaultProps = {
	dropEffect: dropEffects.All,
};

export default Droppable;
