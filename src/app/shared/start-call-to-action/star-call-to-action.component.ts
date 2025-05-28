import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-star-call-to-action',
  standalone: true,
  templateUrl: './star-call-to-action.component.html',
  styleUrls: ['./star-call-to-action.component.css']
})
export class StarCallToActionComponent implements OnInit {
  @Input() repoUrl: string = 'https://github.com/gutifer666/daw-chat';

  constructor() { }

  ngOnInit(): void {
    this.createStarRays();
  }

  createStarRays(): void {
    setTimeout(() => {
      const starRays = document.querySelector('.star-rays');
      if (!starRays) return;

      const numRays = 12;

      for (let i = 0; i < numRays; i++) {
        const ray = document.createElement('div');
        ray.className = 'ray';

        const angle = i * (360 / numRays);
        const length = Math.random() * 20 + 30; // entre 30px y 50px

        ray.style.width = `${length}px`;
        ray.style.transform = `rotate(${angle}deg)`;
        ray.style.animation = `star-pulse ${Math.random() * 1 + 1.5}s infinite ease-in-out`;

        starRays.appendChild(ray);
      }
    }, 0);
  }
}
