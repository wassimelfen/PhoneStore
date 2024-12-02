import { Component } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {
  title = "À propos de nous";
subtitleVision = "Notre vision";
descVision = "Avec notre force innovante et dynamique, nos équipes de production/ventes professionnelles s'engagent à maintenir la satisfaction client à son plus haut niveau et abordent les projets avec une approche innovante et axée sur les solutions.";
imgVision = "assets/images/vision.png";
subtitleMission = "Notre mission";
descMission = "Améliorer la qualité de vie en offrant les produits et services les plus adaptés aux besoins en téléphonie mobile de la société.";
  imgMission = "assets/images/mission.png"

}
