import React from 'react';
import { Card } from 'antd';
const { Meta } = Card;

const CardBook = (props) => {
    const { book } = props;
    return (
            <Card
                hoverable
                style={{
                    width: 240,
                    textAlign: "center",
                    padding: "11px",
                    margin: "20px 0 30px 0",
                }}
                cover={
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "300px" }}>
                        <img
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                                margin: "auto",
                            }}
                            alt="example"
                            src={book.image}
                        />
                    </div>
                }
            >
                <Meta
                    title={<span style={{color: "#2e77fe"}}>{book.title}</span>}
                    description={<span style={{color: "#6495ED"}}>{book.author}</span>}
                />
            </Card>

    );
};

export default CardBook;
