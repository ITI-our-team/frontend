import './Card.css'
import { Link } from 'react-router-dom';

function Card({ id, title, imge }) {
    return (
        <Link to={`/services/${id}`} className="card-link">
            <div className='card'>
                <div className="card-img">
                    <img src={imge} alt={title}/>
                </div>

                <div className="about-card">
                    <p className='title-card'>{title}</p>
                </div>
            </div>
        </Link>
    )
}

export default Card;
