import Card from "./Card.jsx";

function Service({ service }) {
    return (
        <Card
            id={service.idMeal}
            title={service.strMeal}
            imge={service.strMealThumb}
        />
    );
}

export default Service;
