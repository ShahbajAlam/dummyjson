import React from "react";
import Home from "./Home";
import Card from "./Card";
import styles from "./App.module.css";
const PER_PAGE = 10;

const Pagination = (props) => {
    return (
        <div className={styles.pagination}>
            <button onClick={props.onPrev}>PREV</button>
            <h3>
                {props.pageNumber}/{props.totalPages}
            </h3>
            <button onClick={props.onNext}>NEXT</button>
        </div>
    );
};

const App = () => {
    const [value, setValue] = React.useState(0);
    const [pageNumber, setPageNumber] = React.useState(1);
    const [products, setProducts] = React.useState({});

    React.useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(
                `https://dummyjson.com/products?limit=${PER_PAGE}&skip=${
                    value * 10
                }`
            );
            const data = await res.json();
            setProducts(data);
            window.scrollTo({
                left: 0,
                top: 0,
                behavior: "smooth",
            });
        };
        fetchData();
    }, [value]);

    return (
        <React.Fragment>
            <Home />
            {Object.keys(products).length > 0 && (
                <div className={styles.cards}>
                    {products.products.map((p) => {
                        return <Card props={p} key={p.id} />;
                    })}
                </div>
            )}
            {Object.keys(products).length > 0 && (
                <Pagination
                    onPrev={() => {
                        if (value === 0) {
                            alert("This is the first page...");
                            return;
                        }
                        setValue((prevState) => prevState - 1);
                        setPageNumber((prevState) => prevState - 1);
                    }}
                    onNext={() => {
                        if (value === (products.total - PER_PAGE) / 10) {
                            alert("This is the last page...");
                            return;
                        }
                        setValue((prevState) => prevState + 1);
                        setPageNumber((prevState) => prevState + 1);
                    }}
                    pageNumber={pageNumber}
                    totalPages={products.total / PER_PAGE}
                />
            )}
        </React.Fragment>
    );
};

export default App;
