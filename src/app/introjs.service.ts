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
          element: document.querySelectorAll('#step2')[0],
          intro:
            'Welcome to Feature One! On this page you can see all of your AR projects',
        },
        {
          element: '#step4 ',
          intro:
            'Press on the box above to create a new AR experience',
        },
        {
          element: '#step3',
          intro:
            'Press on the box above to create a new AR experience',
        },
      ],
      showProgress: true
    });
    intro.start();
  }

  constructor() { }
}
