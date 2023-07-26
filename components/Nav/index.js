import { useRouter } from "next/router";
import { StyledNav, StyledUl, StyledLi, StyledLink, StyledIcon } from "./style";
import { MdAddLocationAlt} from "react-icons/md";
import {PiWavesBold, PiWavesFill} from "react-icons/pi"


export default function Navigation() {
  const router = useRouter();
  const linksData = [
    {
      id: 1,
      title: "YOUR HIDDEN SPOTS",
      href: "/",
      icon: PiWavesBold,
    },
    {
      id: 2,
      title: "ADD A NEW SPOT",
      href: "/AddANewSpot",
      icon: MdAddLocationAlt,
    },
  ];
  return (
    <StyledNav>
      <StyledUl>
        {linksData.map((linkData) => {
          const isActive = router.pathname === linkData.href;
          const Icon = linkData.icon;
          return (
            <StyledLi key={linkData.id} aria-label={`${linkData.title} page`}>
              <StyledLink href={linkData.href}>
                <StyledIcon as={Icon} size={30} $active={isActive} />
              </StyledLink>
            </StyledLi>
          );
        })}
      </StyledUl>
    </StyledNav>
  );
}
