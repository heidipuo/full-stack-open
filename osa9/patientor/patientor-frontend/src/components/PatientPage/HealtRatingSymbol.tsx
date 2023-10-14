import { green, red, yellow } from "@mui/material/colors";
import { HealthCheckRating } from "../../types";
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckRatingSymbol = ({rate}: {rate: HealthCheckRating}) => {
    switch (rate) {
        case 0:
            return <FavoriteIcon sx={{ color: green[600] }}/>;
        case 1:
            return <FavoriteIcon sx={{ color: yellow[500] }}/>;
        case 2:
            return <FavoriteIcon sx={{ color: red[500] }}/>;
        case 3:
            return <FavoriteIcon />;
        default:
            return <>-</>
    }
}

export default HealthCheckRatingSymbol;