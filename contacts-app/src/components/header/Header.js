import { useLocation } from 'react-router-dom';
import Grid from '@mui/material/Grid';
import Search from '../search/Search';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';

const Header = ({ searchContact }) => {
  const location = useLocation()

  return (
    <header className="header">
      <Grid container xs={12} maxWidth="sm" sx={{ mt: 1 }}>
        <Grid item sx={{ mb: 1 }}>
          <Typography variant='h4'>Contacts</Typography>
        </Grid>
        <Grid item xs={12}>
          {location.pathname === "/" && <Search searchContact={searchContact} />}
        </Grid>
      </Grid>
    </header>
  )
}

export default Header;