import React from "react";
import styles from "./Card.module.css";

const Card = ({ props }) => {
    return (
        <div className={styles.card}>
            <img src={props.images[0]} />
            <div className={styles.title}>
                <h3>{props.title}</h3>
                <h3>${props.price}</h3>
            </div>
            <p>{props.description}</p>
            <div className={styles.rating}>
                <h3>Ratings: {props.rating}</h3>
                <h3>Discount : {props.discountPercentage}%</h3>
            </div>
        </div>
    );
};

export default Card;
