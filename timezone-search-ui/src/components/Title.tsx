import * as React from 'react';
import './title.css';

export interface IProps {
	text: string
}

const Title = (props: IProps) => (
    <div className="title">
    	<span className="text">{ props.text }</span>
    </div>
);

export default Title;