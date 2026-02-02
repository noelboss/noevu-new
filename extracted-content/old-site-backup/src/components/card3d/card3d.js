import noevu from "/global/noevu.js";
import init3dCards from "/global/components/cards3d/cards3d.js";
import "./card3d.less";

noevu.init(() => {
  init3dCards("[id*='cards3d']", ".list-item-basic-animation");
});
