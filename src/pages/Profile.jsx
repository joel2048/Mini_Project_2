import { useAuth0 } from "@auth0/auth0-react";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { alpha } from "@mui/material/styles";

const Profile = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading ...</div>;
  }

  if (isAuthenticated) {
    return (
      <Card
        sx={{
          height: "auto",
          bgcolor: alpha('#9ba8d1', 0.8),
          my: 5,
          ml: 5,
          mr: 5,
        }}
      >
      <div>
          <Box
            component="img"
            src={user.picture}
            alt={user.name}
            sx={{ mt: 1.5 }} // 1.5 * 8 = 12px
          />
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p>auth0 ID: {user.sub}</p>
          <Typography component="a" href="/decks" sx={{ display: 'block', mb: 3, fontSize: 20, fontWeight: 'bold'}}>
            Saved Decks
          </Typography>
      </div> 
      </Card>
    ); 
  } else {
    return (
        <p>Log in to view page</p>
    )
  }
};

export default Profile;