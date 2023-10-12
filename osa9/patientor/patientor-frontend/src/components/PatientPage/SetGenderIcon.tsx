import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import OtherIcon from '@mui/icons-material/TripOrigin';
import { Gender } from '../../types';

interface Props {
    gender: Gender
}

const setGenderIcon = ({gender}: Props) => {
    
    if (gender === 'female') {
        return <><FemaleIcon/></>
    }else if (gender === 'male') {
        return <><MaleIcon/></>
    }else{
        return <><OtherIcon/></>
    }

}

export default setGenderIcon;