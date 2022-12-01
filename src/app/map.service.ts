import { Injectable } from '@angular/core';

export class FeatureCollection {
  type: string | undefined;

  features: Feature[] | undefined;
}

export class Feature {
  type: string | undefined;

  properties?: FeatureProperty;
  geometry: FeatureGeometry = new FeatureGeometry;
}

export class FeatureProperty {
  name: string | undefined;
  color: string | undefined;
  square?: number;
}

export class FeatureGeometry {
  type: string | undefined;

  coordinates: number[][][] = [];
}

const buildingData: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [10, -80],
          [-80, -80],
          [-80, 80],
          [40, 80],
          [40, -20],
          [100, -20],
          [100, -80],
          [30, -80],
          [30, -74],
          [34, -74],
          [34, -68],
          [40, -68],
          [40, -74],
          [94, -74],
          [94, -26],
          [40, -26],
          [40, -60],
          [34, -60],
          [34, 74],
          [-74, 74],
          [-74, 30],
          [10, 30],
          [10, 24],
          [-74, 24],
          [-74, -24],
          [10, -24],
          [10, -30],
          [-74, -30],
          [-74, -74],
          [10, -74],
        ]],
      },
    },
  ],
};

const roomsData: FeatureCollection = {
  type: 'FeatureCollection',
  features: [
    {
      type: 'Feature',
      properties: {
        name: 'Living Room',
        square: 576,
        color: '#87D37C'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74, -30],
          [34, -30],
          [34, -74],
          [-74, -74],
        ]],
      },
    }, {
      type: 'Feature',
      properties: {
        name: 'Kitchen',
        square: 600,
        color: '#FFFFFF'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74, 24],
          [34, 24],
          [34, -24],
          [-74, -24],
        ]],
      },
    }, {
      type: 'Feature',
      properties: {
        name: 'Bedroom',
        square: 540,
        color: '#FFFFFF'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [-74, 74],
          [34, 74],
          [34, 30],
          [-74, 30],
        ]],
      },
    }, {
      type: 'Feature',
      properties: {
        name: 'Bathroom',
        square: 288,
        color: '#FFFFFF'
      },
      geometry: {
        type: 'Polygon',
        coordinates: [[
          [40, -26],
          [94, -26],
          [94, -74],
          [40, -74],
        ]],
      },
    },
  ],
};

@Injectable()
export class Service {
  getBuildingData(): FeatureCollection {
    return buildingData;
  }

  getRoomsData(): FeatureCollection {
    return roomsData;
  }
}
