
import './Card.css'


function Card(props) {
    
    return (
        <div className='card'>
            <div className="card-img">
                <img src= {props.imge} alt={props.title} />
            </div>

            <div className="about-card">
                <p className='title-card'>{props.title}</p>
            </div>
        </div>
    )
}

export default Card;

