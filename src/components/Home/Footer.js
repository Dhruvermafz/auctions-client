import styled from "@emotion/styled";
import Typography from "@mui/material/Typography";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterContainer>
      <Typography variant="body1" textAlign={"center"}>
        &copy; {currentYear} Live Auctions
      </Typography>
    </FooterContainer>
  );
};

export default Footer;

const FooterContainer = styled.footer`
  color: #fff;
  padding: 1rem;
  background-color: #1b1b1b;
  margin-top: auto;
`;
