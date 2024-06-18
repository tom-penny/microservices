import { BeatLoader } from 'react-spinners'

import './Spinner.scss'

const Spinner = () => {
    return <div className='spinner'>
        <BeatLoader loading={true} size={10}/>
    </div>
}

export default Spinner