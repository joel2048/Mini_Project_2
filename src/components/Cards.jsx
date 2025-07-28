import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { alpha } from "@mui/material/styles";

import '../index.css'

const Cards = ({ cards, loading }) => {
  const cardList = loading ? new Array(10).fill(null) : cards?.data || [];

  return (
    <Container sx={{ marginTop: 3 }}>
      {/* Grid container */}
      <div className="card_container"
      >
        {/* Content */}
        {cardList.map((card, index) => (
          <Card
            key={card?.id || index}
            sx={{
              width: 223,
              height: 422,
              bgcolor: alpha("#9ba8d1", 0.8),
            }}
          >
            <CardMedia
              component="img"
              image={
                loading || !card
                  ? "/yugioh_card_back.jpg"
                  : `https://images.ygoprodeck.com/images/cards_small/${card.id}.jpg`
              }
              sx={{
                width: "100%",
                height: 312,
                objectFit: "cover",
              }}
            />
            
            <CardContent
              sx={{
                height: 44,
                mx: "auto",
              }}
            >
              <Typography gutterBottom variant="body1" component="h2" noWrap>
                {loading ? "Loading..." : card.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {!loading && card.atk ? `ATK:${card.atk}` : " "}
                <br />
                {!loading && card.def ? `DEF:${card.def}` : " "}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Save</Button>
            </CardActions>
          </Card>
        ))}
      </div>
    </Container>
  );
};

export default Cards;