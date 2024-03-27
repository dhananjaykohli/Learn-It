import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  LinearProgress,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";

const CourseCard = ({
  id,
  linkTo,
  title,
  description,
  imgUrl,
  includePrice,
  price,
  createdAt,
  showProgress,
  progress,
}: {
  id: number;
  linkTo: string;
  title: string;
  description: string;
  imgUrl: string | undefined;
  price: number;
  includePrice: boolean;
  createdAt: Date;
  showProgress?: boolean;
  progress?: number;
}) => {
  return (
    <Card variant="outlined" sx={{ maxWidth: 345 }}>
      <Link to={linkTo} style={{ textDecoration: "none", color: "inherit" }}>
        <CardHeader title={title} subheader={createdAt.toDateString()} />
        <CardMedia
          component="img"
          height="194"
          image={imgUrl}
          alt={`${title} image`}
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
          {includePrice && (
            <Typography variant="h6" color="text.secondary" marginTop={1}>
              {`$${price}`}
            </Typography>
          )}
        </CardContent>
        {showProgress && (
          <LinearProgress variant="determinate" value={progress} />
        )}
      </Link>
    </Card>
  );
};

export default CourseCard;
