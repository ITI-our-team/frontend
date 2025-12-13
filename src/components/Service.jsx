import Card from "./Card.jsx";

function Service({ service }) {
    return (
        <Card
            id={service.id}
            title={service.name}
            imge={service.thumbnail}
        />
    );
}

export default Service;
