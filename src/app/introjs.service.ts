import { Injectable } from '@angular/core';
import introJs from 'intro.js';


@Injectable({
  providedIn: 'root'
})
export class IntrojsService {
  featureOne() {
    var intro = introJs();

    intro.setOptions({
      steps: [
        {
          element: document.querySelectorAll('#step1')[0],
          intro:
            'Welcome to GoClean! To start with a flawless cleaning experience, help us out with the current state of things.',
        }
      ],
      showProgress: true
    });
    intro.start()
  }

  constructor() { }
}
