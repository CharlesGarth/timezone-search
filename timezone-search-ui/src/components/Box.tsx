import * as React from 'react';
import './box.css';

export interface IProps {
	children: any
}

const Box = (props: IProps) => (
    <div className="box">
    	{ props.children }
    </div>
);

export default Box;