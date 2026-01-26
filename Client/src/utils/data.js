import { FaLeaf, FaShippingFast } from "react-icons/fa";
import { GiChefToque } from "react-icons/gi";
import IA1 from "../assets/IA1.png";
import IA2 from "../assets/IA2.png";
import IA3 from "../assets/IA3.png";
import IA4 from "../assets/IA4.png";
import IA5 from "../assets/IA5.png";
import IA6 from "../assets/IA6.png";
import BannerImage from "../assets/BannerImage.png";
import Image1 from "../assets/Image1.png";
import Image2 from "../assets/Image2.png";
import Image3 from "../assets/Image3.png";
import Image4 from "../assets/Image4.png";
import Video from "../assets/Video.mp4";

export const features = [
  {
    id: 1,
    title: "Instant Delivery",
    text: "30-minute delivery guarantee in metro areas",
    icon: FaShippingFast,
    img: IA1,
  },
  {
    id: 2,
    title: "Master Chefs",
    text: "Michelin-star trained culinary experts",
    icon: GiChefToque,
    img: IA2,
  },
  {
    id: 3,
    title: "Premium Quality",
    text: "Locally sourced organic ingredients",
    icon: FaLeaf,
    img: IA3,
  },
];

export const teamMembers = [
  {
    name: "Marco Yansen",
    role: "Executive Chef",
    img: IA4,
    bio: "3 Michelin stars | Italian cuisine specialist",
    delay: 0.1,
    social: {
      twitter: "https://x.com/?lang=en",
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
    },
  },
  {
    name: "Amit Singh",
    role: "Pastry Chef",
    img: IA5,
    bio: "World Baking Champion | French desserts expert",
    delay: 0.3,
    social: {
      twitter: "https://x.com/?lang=en",
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
    },
  },
  {
    name: "Akash Trivedi",
    role: "Sushi Chef",
    img: IA6,
    bio: "5th generation sushi chef | Traditional techniques",
    delay: 0.5,
    social: {
      twitter: "https://x.com/?lang=en",
      instagram: "https://www.instagram.com/",
      facebook: "https://www.facebook.com/",
      linkedin: "https://www.linkedin.com/",
    },
  },
];

export const bannerAssets = {
  bannerImage: BannerImage,
  orbitImages: [Image1, Image2, Image3, Image4],
  video: Video,
};
